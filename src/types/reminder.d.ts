// ============================================
// FILE 1: src/types/reminder.types.ts
// ============================================

export type ReminderPriority = "Low" | "Medium" | "High" | "Urgent";
export type ReminderStatus = "Active" | "Dismissed" | "Completed";

export interface PaymentReminder {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  amount: number;
  priority: ReminderPriority;
  status: ReminderStatus;
  category: string; // e.g., "School Fees", "Hostel", "Examination"
  createdAt: string;
  dismissedAt?: string;
  completedAt?: string;
  hasDiscount: boolean;
  discountPercentage?: number;
  discountEndDate?: string; // Early payment discount deadline
}

export interface ReminderSettings {
  enabled: boolean;
  notifyDaysBefore: number[]; // e.g., [7, 3, 1] - notify 7, 3, and 1 day before
  emailNotifications: boolean;
  pushNotifications: boolean;
  showDiscountReminders: boolean;
}

// ============================================
// FILE 2: src/utils/reminderStorage.ts
// ============================================

// LESSON 49: Reminder storage with localStorage

const REMINDERS_KEY = "payment_reminders";
const SETTINGS_KEY = "reminder_settings";

export const reminderStorage = {
  // Get all reminders
  getAll: (): PaymentReminder[] => {
    try {
      const data = localStorage.getItem(REMINDERS_KEY);
      if (!data) return [];
      return JSON.parse(data) as PaymentReminder[];
    } catch (error) {
      console.error("Error reading reminders:", error);
      return [];
    }
  },

  // Get active reminders only
  getActive: (): PaymentReminder[] => {
    return reminderStorage.getAll().filter(r => r.status === "Active");
  },

  // Get reminders by priority
  getByPriority: (priority: ReminderPriority): PaymentReminder[] => {
    return reminderStorage.getActive().filter(r => r.priority === priority);
  },

  // Get overdue reminders
  getOverdue: (): PaymentReminder[] => {
    const now = new Date();
    return reminderStorage.getActive().filter(r => {
      return new Date(r.dueDate) < now;
    });
  },

  // Get upcoming reminders (next 7 days)
  getUpcoming: (days: number = 7): PaymentReminder[] => {
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    return reminderStorage.getActive().filter(r => {
      const dueDate = new Date(r.dueDate);
      return dueDate >= now && dueDate <= future;
    });
  },

  // Save new reminder
  save: (reminder: PaymentReminder): boolean => {
    try {
      const reminders = reminderStorage.getAll();
      reminders.unshift(reminder);
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
      return true;
    } catch (error) {
      console.error("Error saving reminder:", error);
      return false;
    }
  },

  // Update reminder
  update: (id: string, updates: Partial<PaymentReminder>): boolean => {
    try {
      const reminders = reminderStorage.getAll();
      const index = reminders.findIndex(r => r.id === id);
      if (index === -1) return false;
      
      reminders[index] = { ...reminders[index], ...updates };
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
      return true;
    } catch (error) {
      console.error("Error updating reminder:", error);
      return false;
    }
  },

  // Delete reminder
  delete: (id: string): boolean => {
    try {
      const reminders = reminderStorage.getAll();
      const filtered = reminders.filter(r => r.id !== id);
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error deleting reminder:", error);
      return false;
    }
  },

  // Dismiss reminder
  dismiss: (id: string): boolean => {
    return reminderStorage.update(id, {
      status: "Dismissed",
      dismissedAt: new Date().toISOString()
    });
  },

  // Mark as completed
  complete: (id: string): boolean => {
    return reminderStorage.update(id, {
      status: "Completed",
      completedAt: new Date().toISOString()
    });
  },

  // Clear all reminders
  clear: (): void => {
    localStorage.removeItem(REMINDERS_KEY);
  },

  // Get settings
  getSettings: (): ReminderSettings => {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (!data) {
        return {
          enabled: true,
          notifyDaysBefore: [7, 3, 1],
          emailNotifications: false,
          pushNotifications: true,
          showDiscountReminders: true
        };
      }
      return JSON.parse(data) as ReminderSettings;
    } catch (error) {
      console.error("Error reading settings:", error);
      return {
        enabled: true,
        notifyDaysBefore: [7, 3, 1],
        emailNotifications: false,
        pushNotifications: true,
        showDiscountReminders: true
      };
    }
  },

  // Save settings
  saveSettings: (settings: ReminderSettings): boolean => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      return false;
    }
  }
};


// ============================================
// FILE 3: src/utils/reminderHelpers.ts
// ============================================

// LESSON 50: Helper functions for reminder logic

export const reminderHelpers = {
  // Generate unique reminder ID
  generateId: (): string => {
    return `REM${Date.now()}${Math.floor(Math.random() * 1000)}`;
  },

  // Calculate days until due date
  getDaysUntilDue: (dueDate: string): number => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  // Check if reminder is overdue
  isOverdue: (dueDate: string): boolean => {
    return new Date(dueDate) < new Date();
  },

  // Get priority based on days until due
  calculatePriority: (daysUntilDue: number): ReminderPriority => {
    if (daysUntilDue < 0) return "Urgent"; // Overdue
    if (daysUntilDue <= 1) return "Urgent";
    if (daysUntilDue <= 3) return "High";
    if (daysUntilDue <= 7) return "Medium";
    return "Low";
  },

  // Get priority color
  getPriorityColor: (priority: ReminderPriority): string => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-800 border-red-600";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-600";
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-600";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  },

  // Get priority icon
  getPriorityIcon: (priority: ReminderPriority): string => {
    switch (priority) {
      case "Urgent":
        return "🚨";
      case "High":
        return "⚠️";
      case "Medium":
        return "⏰";
      case "Low":
        return "📌";
      default:
        return "📋";
    }
  },

  // Format days remaining
  formatDaysRemaining: (daysUntilDue: number): string => {
    if (daysUntilDue < 0) {
      const overdue = Math.abs(daysUntilDue);
      return `${overdue} day${overdue === 1 ? '' : 's'} overdue`;
    }
    if (daysUntilDue === 0) return "Due today";
    if (daysUntilDue === 1) return "Due tomorrow";
    return `${daysUntilDue} days remaining`;
  },

  // Calculate discount amount
  calculateDiscount: (amount: number, percentage: number): number => {
    return amount * (percentage / 100);
  },

  // Check if discount is still available
  isDiscountAvailable: (reminder: PaymentReminder): boolean => {
    if (!reminder.hasDiscount || !reminder.discountEndDate) return false;
    return new Date(reminder.discountEndDate) >= new Date();
  },

  // Get discount message
  getDiscountMessage: (reminder: PaymentReminder): string | null => {
    if (!reminderHelpers.isDiscountAvailable(reminder)) return null;
    
    const daysLeft = reminderHelpers.getDaysUntilDue(reminder.discountEndDate!);
    const discountAmount = reminderHelpers.calculateDiscount(
      reminder.amount, 
      reminder.discountPercentage || 0
    );
    
    return `Save ₦${discountAmount.toLocaleString()} (${reminder.discountPercentage}% off) if you pay within ${daysLeft} day${daysLeft === 1 ? '' : 's'}!`;
  },

  // Sort reminders by priority and date
  sortReminders: (reminders: PaymentReminder[]): PaymentReminder[] => {
    const priorityOrder = { "Urgent": 0, "High": 1, "Medium": 2, "Low": 3 };
    
    return [...reminders].sort((a, b) => {
      // First by priority
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by due date
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  },

  // Check if should notify today
  shouldNotifyToday: (reminder: PaymentReminder, settings: ReminderSettings): boolean => {
    if (!settings.enabled) return false;
    
    const daysUntil = reminderHelpers.getDaysUntilDue(reminder.dueDate);
    return settings.notifyDaysBefore.includes(daysUntil) || daysUntil <= 0;
  }
};