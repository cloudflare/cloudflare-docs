---
_build:
  publishResources: false
  render: never
  list: never
---

  ```txt
  ---
  filename: variables.tf
  ---
  # GCP variables
  variable "gcp_project_id" {
    description = "Google Cloud Platform (GCP) project ID"
    type        = string
  }

  variable "zone" {
    description = "Geographical zone for the GCP VM instance"
    type        = string
  }

  variable "machine_type" {
    description = "Machine type for the GCP VM instance"
    type        = string
  }

  # Cloudflare variables
  variable "cloudflare_zone" {
    description = "Domain used to expose the GCP VM instance to the Internet"
    type        = string
  }

  variable "cloudflare_zone_id" {
    description = "Zone ID for your domain"
    type        = string
  }

  variable "cloudflare_account_id" {
    description = "Account ID for your Cloudflare account"
    type        = string
    sensitive   = true
  }

  variable "cloudflare_email" {
    description = "Email address for your Cloudflare account"
    type        = string
    sensitive   = true
  }

  variable "cloudflare_token" {
    description = "Cloudflare API token created at https://dash.cloudflare.com/profile/api-tokens"
    type        = string
  }
  ```