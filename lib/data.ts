
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    token?: string
    slack_token?: string | null
    gmail_token?: string | null
    jira_token?: string | null
    outlook_token?: string | null
  }