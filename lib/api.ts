const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    
    return response.json();
  },

  async signup(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }
    
    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user info');
    }
    
    return response.json();
  },

  async checkJiraConnection(token: string) {
    // TODO: Implement when Jira OAuth is added
    return false;
  },

  // Fetch messages and emails
  async getSlackChannels(token: string) {
    const response = await fetch(`${API_URL}/slack/conversations`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Slack conversations');
    }
    
    return response.json();
  },

  async getSlackMessages(token: string, channelId: string) {
    const response = await fetch(`${API_URL}/slack/channels/${channelId}/messages`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Slack messages');
    }
    
    return response.json();
  },

  async getSlackConversations(token: string) {
    const response = await fetch(`${API_URL}/slack/conversations`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Slack conversations');
    }
    
    return response.json();
  },

  async getGmailEmails(token: string) {
    const response = await fetch(`${API_URL}/gmail/emails`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Gmail emails');
    }
    
    return response.json();
  }
}; 