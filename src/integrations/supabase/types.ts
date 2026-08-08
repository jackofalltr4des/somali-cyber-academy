export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      certificates: {
        Row: {
          id: string;
          issued_at: string;
          score: number;
          title: string;
          track: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          issued_at?: string;
          score?: number;
          title: string;
          track: string;
          user_id: string;
        };
        Update: {
          id?: string;
          issued_at?: string;
          score?: number;
          title?: string;
          track?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      enrollments: {
        Row: {
          created_at: string;
          id: string;
          module_slug: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          module_slug: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          module_slug?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      exam_attempts: {
        Row: {
          answers: Json;
          created_at: string;
          id: string;
          passed: boolean;
          path_slug: string;
          score: number;
          total: number;
          user_id: string;
        };
        Insert: {
          answers: Json;
          created_at?: string;
          id?: string;
          passed: boolean;
          path_slug: string;
          score: number;
          total: number;
          user_id: string;
        };
        Update: {
          answers?: Json;
          created_at?: string;
          id?: string;
          passed?: boolean;
          path_slug?: string;
          score?: number;
          total?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      lab_submissions: {
        Row: {
          answers: Json;
          created_at: string;
          id: string;
          lab_slug: string;
          passed: boolean;
          report: string | null;
          score: number;
          total: number;
          user_id: string;
        };
        Insert: {
          answers?: Json;
          created_at?: string;
          id?: string;
          lab_slug: string;
          passed?: boolean;
          report?: string | null;
          score?: number;
          total?: number;
          user_id: string;
        };
        Update: {
          answers?: Json;
          created_at?: string;
          id?: string;
          lab_slug?: string;
          passed?: boolean;
          report?: string | null;
          score?: number;
          total?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      lesson_progress: {
        Row: {
          completed_at: string;
          id: string;
          lesson_slug: string;
          module_slug: string;
          quiz_score: number;
          quiz_total: number;
          user_id: string;
        };
        Insert: {
          completed_at?: string;
          id?: string;
          lesson_slug: string;
          module_slug: string;
          quiz_score?: number;
          quiz_total?: number;
          user_id: string;
        };
        Update: {
          completed_at?: string;
          id?: string;
          lesson_slug?: string;
          module_slug?: string;
          quiz_score?: number;
          quiz_total?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          admin_note: string | null;
          amount_usd: number;
          created_at: string;
          id: string;
          item_slug: string;
          item_type: Database["public"]["Enums"]["payment_item_type"];
          phone: string | null;
          proof_url: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: Database["public"]["Enums"]["payment_status"];
          transaction_id: string;
          user_id: string;
        };
        Insert: {
          admin_note?: string | null;
          amount_usd: number;
          created_at?: string;
          id?: string;
          item_slug: string;
          item_type: Database["public"]["Enums"]["payment_item_type"];
          phone?: string | null;
          proof_url?: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transaction_id: string;
          user_id: string;
        };
        Update: {
          admin_note?: string | null;
          amount_usd?: number;
          created_at?: string;
          id?: string;
          item_slug?: string;
          item_type?: Database["public"]["Enums"]["payment_item_type"];
          phone?: string | null;
          proof_url?: string | null;
          provider?: Database["public"]["Enums"]["payment_provider"];
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transaction_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      points_ledger: {
        Row: {
          action_type: string;
          created_at: string;
          id: string;
          points: number;
          reference_slug: string;
          user_id: string;
        };
        Insert: {
          action_type: string;
          created_at?: string;
          id?: string;
          points: number;
          reference_slug: string;
          user_id: string;
        };
        Update: {
          action_type?: string;
          created_at?: string;
          id?: string;
          points?: number;
          reference_slug?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          city: string | null;
          created_at: string;
          display_name: string;
          goal: string | null;
          id: string;
          updated_at: string;
          username: string | null;
          weekly_hours: number;
        };
        Insert: {
          city?: string | null;
          created_at?: string;
          display_name?: string;
          goal?: string | null;
          id: string;
          updated_at?: string;
          username?: string | null;
          weekly_hours?: number;
        };
        Update: {
          city?: string | null;
          created_at?: string;
          display_name?: string;
          goal?: string | null;
          id?: string;
          updated_at?: string;
          username?: string | null;
          weekly_hours?: number;
        };
        Relationships: [];
      };
      rate_limit_counters: {
        Row: {
          action: string;
          count: number;
          user_id: string;
          window_start: string;
        };
        Insert: {
          action: string;
          count?: number;
          user_id: string;
          window_start: string;
        };
        Update: {
          action?: string;
          count?: number;
          user_id?: string;
          window_start?: string;
        };
        Relationships: [];
      };
      referral_codes: {
        Row: {
          code: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      referrals: {
        Row: {
          commission_usd: number;
          created_at: string;
          earned_at: string | null;
          id: string;
          paid_at: string | null;
          referral_code: string;
          referred_id: string;
          referrer_id: string;
          status: Database["public"]["Enums"]["referral_status"];
        };
        Insert: {
          commission_usd?: number;
          created_at?: string;
          earned_at?: string | null;
          id?: string;
          paid_at?: string | null;
          referral_code: string;
          referred_id: string;
          referrer_id: string;
          status?: Database["public"]["Enums"]["referral_status"];
        };
        Update: {
          commission_usd?: number;
          created_at?: string;
          earned_at?: string | null;
          id?: string;
          paid_at?: string | null;
          referral_code?: string;
          referred_id?: string;
          referrer_id?: string;
          status?: Database["public"]["Enums"]["referral_status"];
        };
        Relationships: [];
      };
      role_change_audit: {
        Row: {
          action: string;
          actor_id: string;
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          target_user_id: string;
        };
        Insert: {
          action: string;
          actor_id: string;
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          target_user_id: string;
        };
        Update: {
          action?: string;
          actor_id?: string;
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          target_user_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      public_leaderboard: {
        Row: {
          account_created_at: string | null;
          total_points: number | null;
          user_id: string | null;
          username: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      approve_payment_and_process_referral: {
        Args: { _admin_id: string; _note?: string; _payment_id: string };
        Returns: undefined;
      };
      check_rate_limit: {
        Args: {
          p_action: string;
          p_limit: number;
          p_user_id: string;
          p_window_seconds: number;
        };
        Returns: boolean;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "student" | "guest" | "instructor" | "super_admin";
      payment_item_type: "course" | "exam" | "certificate";
      payment_provider: "zaad" | "edahab";
      payment_status: "pending" | "approved" | "rejected";
      referral_status: "pending" | "earned" | "paid";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "guest", "instructor", "super_admin"],
      payment_item_type: ["course", "exam", "certificate"],
      payment_provider: ["zaad", "edahab"],
      payment_status: ["pending", "approved", "rejected"],
      referral_status: ["pending", "earned", "paid"],
    },
  },
} as const;
