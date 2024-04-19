ALTER TYPE "friendsEnum" ADD VALUE 'JOINED';--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "status" "friendsEnum" DEFAULT 'PENDING' NOT NULL;