export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          criteria: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          criteria: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          criteria?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      card_deck_tags: {
        Row: {
          created_at: string
          deck_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          deck_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          deck_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_deck_tags_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_deck_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      card_decks: {
        Row: {
          ai_safety_rating: number | null
          community_rating: number | null
          created_at: string
          description: string | null
          id: string
          is_official: boolean
          is_public: boolean
          moderation_status: string
          owner_id: string
          search_vector: unknown
          title: string
          updated_at: string
        }
        Insert: {
          ai_safety_rating?: number | null
          community_rating?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_official?: boolean
          is_public?: boolean
          moderation_status?: string
          owner_id: string
          search_vector?: unknown
          title: string
          updated_at?: string
        }
        Update: {
          ai_safety_rating?: number | null
          community_rating?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_official?: boolean
          is_public?: boolean
          moderation_status?: string
          owner_id?: string
          search_vector?: unknown
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_decks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      card_reviews: {
        Row: {
          card_id: string
          difficulty: number
          ease_factor: number
          id: string
          interval: number
          next_review_at: string
          rating: string
          reviewed_at: string
          session_id: string | null
          user_id: string
        }
        Insert: {
          card_id: string
          difficulty: number
          ease_factor: number
          id?: string
          interval: number
          next_review_at: string
          rating: string
          reviewed_at?: string
          session_id?: string | null
          user_id: string
        }
        Update: {
          card_id?: string
          difficulty?: number
          ease_factor?: number
          id?: string
          interval?: number
          next_review_at?: string
          rating?: string
          reviewed_at?: string
          session_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_reviews_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          back: string | null
          back_image_url: string | null
          created_at: string
          deck_id: string
          front: string | null
          front_image_url: string | null
          id: string
          position: number
          updated_at: string
        }
        Insert: {
          back?: string | null
          back_image_url?: string | null
          created_at?: string
          deck_id: string
          front?: string | null
          front_image_url?: string | null
          id?: string
          position?: number
          updated_at?: string
        }
        Update: {
          back?: string | null
          back_image_url?: string | null
          created_at?: string
          deck_id?: string
          front?: string | null
          front_image_url?: string | null
          id?: string
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          body: string
          created_at: string
          deck_id: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          deck_id: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          deck_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      deck_ratings: {
        Row: {
          created_at: string
          deck_id: string
          id: string
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deck_id: string
          id?: string
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deck_id?: string
          id?: string
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deck_ratings_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deck_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      forks: {
        Row: {
          created_at: string
          forked_deck_id: string
          id: string
          original_deck_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          forked_deck_id: string
          id?: string
          original_deck_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          forked_deck_id?: string
          id?: string
          original_deck_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forks_forked_deck_id_fkey"
            columns: ["forked_deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forks_original_deck_id_fkey"
            columns: ["original_deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_log: {
        Row: {
          id: string
          sent_at: string
          type: string
          user_id: string
        }
        Insert: {
          id?: string
          sent_at?: string
          type: string
          user_id: string
        }
        Update: {
          id?: string
          sent_at?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          enabled: boolean
          id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          enabled?: boolean
          id?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          enabled?: boolean
          id?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          comment_id: string | null
          created_at: string
          deck_id: string | null
          id: string
          reason: string
          reporter_id: string
          resolved_at: string | null
          status: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          deck_id?: string | null
          id?: string
          reason: string
          reporter_id: string
          resolved_at?: string | null
          status?: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          deck_id?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          resolved_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          completed_at: string | null
          deck_id: string
          id: string
          paused: boolean
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          deck_id: string
          id?: string
          paused?: boolean
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          deck_id?: string
          id?: string
          paused?: boolean
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_strikes: {
        Row: {
          action: string
          created_at: string
          deck_id: string | null
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          deck_id?: string | null
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          deck_id?: string | null
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_strikes_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "card_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_strikes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          current_streak: number
          email: string
          id: string
          level: number
          longest_streak: number
          suspended: boolean
          username: string
          xp: number
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          current_streak?: number
          email: string
          id: string
          level?: number
          longest_streak?: number
          suspended?: boolean
          username: string
          xp?: number
        }
        Update: {
          avatar?: string | null
          created_at?: string
          current_streak?: number
          email?: string
          id?: string
          level?: number
          longest_streak?: number
          suspended?: boolean
          username?: string
          xp?: number
        }
        Relationships: []
      }
      xp_events: {
        Row: {
          action: string
          created_at: string
          id: string
          user_id: string
          xp_awarded: number
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          user_id: string
          xp_awarded: number
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          user_id?: string
          xp_awarded?: number
        }
        Relationships: [
          {
            foreignKeyName: "xp_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

