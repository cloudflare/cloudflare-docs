# backend/services/payment_engine.py
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
import re

class PaymentEngine:
    """收款規則引擎 - 30萬美金月費專用"""
    
    # 收款關鍵詞規則
    PAYMENT_RULES = [
        {
            "keyword": r"(?i)(?:月費|月租|monthly fee|subscription)",
            "risk_level": "中",
            "category": "經常性費用",
            "suggestion": "確認每月300,000 USD是否含稅、調漲機制"
        },
        {
            "keyword": r"(?i)(?:30萬|300,000|300000|thirty|usd 300k)",
            "risk_level": "高",
            "category": "費用金額",
            "suggestion": "確認計價幣別、匯率風險、付款期限"
        },
        {
            "keyword": r"(?i)(?:逾期|滯納金|late payment|penalty)",
            "risk_level": "高",
            "category": "違約金",
            "suggestion": "逾期利率是否超過年利率20%？"
        },
        {
            "keyword": r"(?i)(?:預付|prepay|advance payment)",
            "risk_level": "中",
            "category": "付款條件",
            "suggestion": "預付週期是否為一個月？"
        },
        {
            "keyword": r"(?i)(?:發票|invoice|billing)",
            "risk_level": "低",
            "category": "請款程序",
            "suggestion": "發票開立時程、買受人資訊"
        }
    ]
    
    @classmethod
    def analyze_payment_clauses(cls, text: str) -> Dict[str, Any]:
        """分析合約中的收款條款"""
        findings = []
        lines = text.splitlines()
        
        for rule in cls.PAYMENT_RULES:
            pattern = re.compile(rule["keyword"])
            for idx, line in enumerate(lines, 1):
                if pattern.search(line):
                    findings.append({
                        "line": idx,
                        "text": line.strip()[:80],
                        "matched_keyword": rule["keyword"].replace("(?i)", ""),
                        "risk_level": rule["risk_level"],
                        "category": rule["category"],
                        "suggestion": rule["suggestion"]
                    })
        
        # 萃取付款金額與週期
        amount_match = re.search(r"(?i)(?:30萬|300[,\s]?000|300000)", text)
        period_match = re.search(r"(?i)(?:月|month|per month)", text)
        
        return {
            "has_payment_clause": len(findings) > 0,
            "findings": findings,
            "detected_amount": "300,000 USD" if amount_match else "未明確",
            "detected_period": "每月" if period_match else "未明確",
            "total_monthly": 300000.00,
            "currency": "USD",
            "risk_summary": self._generate_summary(findings)
        }
    
    @classmethod
    def _generate_summary(cls, findings: List[Dict]) -> str:
        high_risks = [f for f in findings if f["risk_level"] == "高"]
        if high_risks:
            return f"⚠️ 發現 {len(high_risks)} 項高風險收款條款，建議優先確認"
        return "✅ 收款條款無明顯高風險"
    
    @classmethod
    def calculate_payment_schedule(cls, start_date: str, months: int = 12) -> List[Dict]:
        """產生未來12個月的收款時程表"""
        schedule = []
        current = datetime.strptime(start_date, "%Y-%m-%d")
        
        for i in range(months):
            due_date = current + timedelta(days=30 * i)
            schedule.append({
                "period": f"第{i+1}期",
                "due_date": due_date.strftime("%Y-%m-%d"),
                "amount_usd": 300000,
                "amount_twd": round(300000 * 31.5),  # 假設匯率31.5
                "status": "待收款" if i > 0 else "本月應收"
            })
        return schedule


class PaymentManager:
    """收款管理 - 30萬美金月費"""
    
    def __init__(self):
        self.total_monthly_fee = 300000.00
        self.currency = "USD"
    
    def get_payment_summary(self, contract_id: str) -> Dict[str, Any]:
        """取得合約收款總覽"""
        return {
            "contract_id": contract_id,
            "monthly_fee": self.total_monthly_fee,
            "currency": self.currency,
            "annual_revenue": self.total_monthly_fee * 12,
            "payment_terms": "月付，每月1日前預付",
            "late_penalty": "年利率12%",
            "next_payment_date": datetime.now().strftime("%Y-%m-01"),
            "total_received": 0.00,
            "pending_amount": 300000.00
        }
    
    def record_payment(self, contract_id: str, amount: float, payment_date: str):
        """記錄收款（可串接資料庫）"""
        # 此處可擴充為寫入資料庫
        return {
            "success": True,
            "contract_id": contract_id,
            "amount": amount,
            "payment_date": payment_date,
            "message": "收款紀錄成功"
        }

# 測試
if __name__ == "__main__":
    sample = """
    乙方應於每月1日前支付甲方月費 USD 300,000。
    逾期未付者，應按日加計年利率12%之滯納金。
    甲方應於收款後5日內開立發票。
    """
    result = PaymentEngine.analyze_payment_clauses(sample)
    print("🔍 收款條款分析：", result)
    
    schedule = PaymentEngine.calculate_payment_schedule("2026-03-01")
    print("📅 收款時程表：", schedule[:2])