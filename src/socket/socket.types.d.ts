export type User = {
  sockedId: string;
  userId: string;
};

export type Msg = User & {
  type: "chat" | "group";
  message: string;
  roomId: string;
  parentId: string;
};
