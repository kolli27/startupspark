import { supabase } from "../supabase/config"
import type { Database } from "@/types/database"

type SavedRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Row"]
type InsertRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Insert"]
type UpdateRecommendation = Database["public"]["Tables"]["saved_recommendations"]["Update"]

export type RecommendationType = "business_idea" | "follow_up" | "suggestion" | "insight"

export const recommendationsService = {
  async saveRecommendation(
    userId: string,
    type: RecommendationType,
    content: string,
    notes?: string
  ) {
    const recommendation: InsertRecommendation = {
      user_id: userId,
      recommendation_type: type,
      content,
      notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("saved_recommendations")
      .insert([recommendation])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserRecommendations(userId: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .update({ 
        is_favorite: isFavorite,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateNotes(id: string, notes: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .update({ 
        notes,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteRecommendation(id: string) {
    const { error } = await supabase
      .from("saved_recommendations")
      .delete()
      .eq("id", id)

    if (error) throw error
  },

  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .eq("is_favorite", true)
      .order("updated_at", { ascending: false })

    if (error) throw error
    return data
  },

  async getRecommendationsByType(userId: string, type: RecommendationType) {
    const { data, error } = await supabase
      .from("saved_recommendations")
      .select("*")
      .eq("user_id", userId)
      .eq("recommendation_type", type)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }
}
