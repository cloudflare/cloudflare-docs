```md
# Cloudflare Belgeleri

**[Belgeleri görüntüle →](https://developers.cloudflare.com/)**

## Cloudflare Belgelerinin açık kaynak olmasının nedeni

Belgelerimiz, topluluğumuzla bağlantıda kalmak ve geri bildirimleri hızlı bir şekilde uygulayabilmek için açık kaynaklıdır. Geri bildirim sağlamak için bir sorun açmış veya kendi içeriğinizi katkıda bulunmuş olsanız da, kaliteli belgeleri sürdürmemize yardımcı olduğunuz için teşekkür ederiz.

Belgelerimiz hakkında herhangi bir geri bildiriminiz varsa veya katkıda bulunmakla ilgileniyorsanız, lütfen [katkı kurallarına](https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md) başvurun.

## Kurulum

Sisteminizde güncel bir Node.js sürümü (22+) yüklü olmalıdır. Node'un en son sürümünü ve `npm`'i yüklemek için bir Node sürüm yöneticisi olan [Volta](https://github.com/volta-cli/volta)'yı kullanabilirsiniz. npm, Node'un yüklemesiyle birlikte gelen bir paket yöneticisidir.

```sh
$ curl https://get.volta.sh | bash
$ volta install node@22
```

Bu projedeki Node.js bağımlılıklarını npm veya başka bir paket yöneticisi kullanarak yükleyin:

```sh
$ npm install
```

## Geliştirme

Siteye yapılan değişiklikler, içerik değişiklikleri dahil, yerel bir geliştirme sunucusunu çalıştırmak için aşağıdaki komutu çalıştırabilirsiniz:

```sh
$ npm run dev
```

Bu, tarayıcınızda `http://localhost:1111` üzerinden erişilebilen bir sunucu oluşturur. Ayrıca, projede yapılan tüm değişiklikler – `content/**` içindeki değişiklikler dahil – tarayıcı sekmenizi otomatik olarak yeniden yükler, böylece değişikliklerinizi anında önizleyebilirsiniz.

### Öneriler

Uygulamamızın bir kısmı [Wrangler değişiklik günlüğünü](https://developers.cloudflare.com/workers/platform/changelog/wrangler/) doldurmak için GitHub API'sine erişir.

<!--
GitHub, kimlik doğrulaması yapılmış isteklere daha yüksek bir istek sınırı verdiğinden, `repos:public_repo` izinlerine sahip bir [klasik belirteç](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) eklemek isteyebilirsiniz. Belirteç değeri, `/assets/secrets/github_token.txt` dosyanızdaki tek şey olmalıdır.
-->

## Dağıtım

Belgelerimiz [Cloudflare Pages](https://pages.cloudflare.com) kullanılarak dağıtılır. Üretime gönderilen her bir commit [developers.cloudflare.com](https://developers.cloudflare.com) adresine otomatik olarak dağıtılacak ve açılan herhangi bir pull request için ilgili staging URL'si pull request yorumlarında mevcut olacaktır.

## Cloudflare çalışanları için

Bu depoya yazma erişimi almak için, lütfen sohbetten **Geliştirici Belgeleri** odasına ulaşın.

## Lisans ve Yasal Bildirimler

Aksi belirtilmedikçe, Cloudflare ve katkıda bulunanlar, bu depodaki Cloudflare Geliştirici Belgeleri ve diğer içerikler için size [Creative Commons Attribution 4.0 Uluslararası Kamu Lisansı](https://creativecommons.org/licenses/by/4.0/legalcode) altında bir lisans verir, [LICENSE dosyasına](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE) bakın ve depodaki herhangi bir kod için [MIT Lisansı](https://opensource.org/licenses/MIT) altında bir lisans verir, [LICENSE-CODE dosyasına](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE) bakın.

Belgelerde atıfta bulunulan Cloudflare ürün ve hizmetleri, Amerika Birleşik Devletleri ve/veya diğer ülkelerde ya Cloudflare'ın ticari markaları ya da tescilli ticari markaları olabilir. Bu proje için verilen lisanslar, Cloudflare adlarını, logolarını veya ticari markalarını kullanma hakkı vermez. Cloudflare'ın genel ticari marka yönergeleri [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/) adresinde bulunabilir.
Cloudflare ve katkıda bulunanlar, ilgili telif hakları, patentler veya ticari markalar altında, ima, estoppel veya başka türlü olsun, diğer tüm hakları saklı tutar.

Lütfen teknik belgeleri, pull request'leri ve halkımıza sunulan diğer konuları incelemek için AI araçlarını kullanabileceğimizi unutmayın. Lütfen gönderimlerinizde kişisel bilgi paylaşmaktan kaçının.

## 🧞 Komutlar

Tüm komutlar, projenin kök dizininden, bir terminalden çalıştırılır:

| Komut                   | Eylem                                      |
|:------------------------|:-------------------------------------------|
| `npm install`           | Bağımlılıkları yükler                      |
| `npm run dev`           | Yerel geliştirme sunucusunu `localhost:1111` adresinde başlatır |
| `npx astro build`       | Üretim sitenizi `./dist/` dizinine oluşturur |
| `npm run astro -- --help` | Astro CLI'yi kullanma konusunda yardım alır |

## 👀 Daha fazla bilgi almak ister misiniz?

[Starlight belgelerine](https://starlight.astro.build/) göz atın, [Astro belgelerini](https://docs.astro.build) okuyun veya [Astro Discord sunucusuna](https://astro.build/chat) katılın.
```

İçeriği Türkçeye çevirdim ve kurulum talimatlarını detaylı bir şekilde ekledim. Başka sorularınız varsa, lütfen bana bildirin.
