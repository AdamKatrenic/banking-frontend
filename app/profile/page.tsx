"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "../lib/api";
import { getUserEmail } from "../lib/auth";
import PageWrapper from "../components/layout/PageWrapper";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordForm = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const email = getUserEmail();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
  resolver: zodResolver(passwordSchema),
});

  const onSubmit = async (data: PasswordForm) => {
    setLoading(true);
    try {
      await api.post("/api/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully!");
      reset();
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Info */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center">
                <User size={20} className="text-[#00BFA6]" />
              </div>
              <h2 className="text-white font-semibold">Account Info</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">{email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Account Status</p>
                <span className="text-xs px-2 py-1 rounded-md border bg-green-900/30 text-green-400 border-green-800 font-medium">
                  ✓ Active
                </span>
              </div>
            </div>
          </Card>

          {/* Change Password */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center">
                <Lock size={20} className="text-[#00BFA6]" />
              </div>
              <h2 className="text-white font-semibold">Change Password</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                error={errors.currentPassword?.message}
                registration={{ ...register("currentPassword") }}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                error={errors.newPassword?.message}
                registration={{ ...register("newPassword") }}
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                registration={{ ...register("confirmPassword") }}
              />
              <Button type="submit" disabled={loading} fullWidth>
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </Card>
        </div>
      </motion.div>
    </PageWrapper>
  );
}