import {
  pgTable,
  pgEnum,
  serial,
  uuid,
  text,
  varchar,
  smallint,
  timestamp,
  unique,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("roleEnum", ["USER", "ADMIN"]);
export const friendsEnum = pgEnum("friendsEnum", ["FRIENDS", "PENDING"]);
export const membersEnum = pgEnum("friendsEnum", [
  "JOINED",
  "PENDING",
  "MODERATOR",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 24 }).notNull().unique(),
  bio: varchar("bio", { length: 50 }).default("Hi! I am a new user here!"),
  password: varchar("password", { length: 255 }).notNull(),
  profilePicUrl: varchar("profilePicUrl", { length: 255 }).default(
    "https://ucarecdn.com/9bc39a33-5800-4f7f-b246-93e4ccefcdab/profilePic.png"
  ),
  role: roleEnum("role").default("USER").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const friends = pgTable(
  "friends",
  {
    id: serial("id").primaryKey(),
    user1: uuid("user1")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    user2: uuid("user2")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    status: friendsEnum("status").default("PENDING").notNull(),
  },
  (table) => ({
    unq: unique("unique_friendship").on(table.user1, table.user2),
  })
);

export const chats = pgTable(
  "chats",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user1: uuid("user1")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    user2: uuid("user2")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
  },
  (table) => ({
    unq: unique("unique_chat").on(table.user1, table.user2),
  })
);

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 24 }).notNull().unique(),
  description: varchar("description", { length: 100 }).default(
    "this is a new group chat on chatter island!"
  ),
  capacity: smallint("capacity").$type<3 | 10 | 25 | 50>().default(3).notNull(),
  moderator: uuid("moderator")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
});

export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),
    userId: uuid("userId")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    groupId: uuid("groupId")
      .references(() => groups.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(),
    status: membersEnum("status").default("PENDING").notNull(),
  },
  (table) => ({
    unq: unique("unique_membership").on(table.userId, table.groupId),
  })
);

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: uuid("senderId")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  chatId: uuid("chatId")
    .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  parentId: uuid("parentId").references((): AnyPgColumn => messages.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  sent_at: timestamp("sent_at").notNull().defaultNow(),
});

export const groupMessages = pgTable("groupMessages", {
  id: uuid("id").primaryKey().defaultRandom(),
  senderId: uuid("senderId")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  groupId: uuid("groupId")
    .references(() => groups.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  parentId: uuid("parentId").references((): AnyPgColumn => groupMessages.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  sent_at: timestamp("sent_at").notNull().defaultNow(),
});

//Relations
export const usersRelations = relations(users, ({ many }) => {
  return {
    friend1: many(friends, { relationName: "first_friend" }),
    friend2: many(friends, { relationName: "sec_friend" }),
    chatUser1: many(chats, { relationName: "first_user" }),
    chatUser2: many(chats, { relationName: "sec_user" }),
    moderate: many(groups),
    member: many(members),
    sends: many(messages),
    groupSends: many(groupMessages),
  };
});

export const friendsRelations = relations(friends, ({ one }) => {
  return {
    friending: one(users, {
      fields: [friends.user1],
      references: [users.id],
      relationName: "first_friend",
    }),
    friended: one(users, {
      fields: [friends.user2],
      references: [users.id],
      relationName: "sec_friend",
    }),
  };
});

export const chatsRelations = relations(chats, ({ one, many }) => {
  return {
    first_user: one(users, {
      fields: [chats.user1],
      references: [users.id],
      relationName: "first_user",
    }),
    sec_user: one(users, {
      fields: [chats.user2],
      references: [users.id],
      relationName: "sec_user",
    }),
    messagesIn: many(messages),
  };
});

export const groupsRelations = relations(groups, ({ one, many }) => {
  return {
    moderated: one(users, {
      fields: [groups.moderator],
      references: [users.id],
    }),
    memberIn: many(members),
    messagesIn: many(groupMessages),
  };
});

export const membersRelations = relations(members, ({ one }) => {
  return {
    user: one(users, {
      fields: [members.userId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [members.groupId],
      references: [groups.id],
    }),
  };
});

export const messagesRelations = relations(messages, ({ one }) => {
  return {
    parentId: one(messages, {
      fields: [messages.parentId],
      references: [messages.id],
    }),
    sender: one(users, {
      fields: [messages.senderId],
      references: [users.id],
    }),
    chat: one(chats, {
      fields: [messages.chatId],
      references: [chats.id],
    }),
  };
});

export const groupMessagesRelations = relations(groupMessages, ({ one }) => {
  return {
    parentId: one(groupMessages, {
      fields: [groupMessages.parentId],
      references: [groupMessages.id],
    }),
    sender: one(users, {
      fields: [groupMessages.senderId],
      references: [users.id],
    }),
    group: one(groups, {
      fields: [groupMessages.groupId],
      references: [groups.id],
    }),
  };
});
