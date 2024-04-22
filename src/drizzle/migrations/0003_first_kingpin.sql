ALTER TABLE "groupMessages" DROP CONSTRAINT "groupMessages_senderId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupMessages" ADD CONSTRAINT "groupMessages_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
