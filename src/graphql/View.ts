import { objectType, extendType, nonNull, intArg } from "nexus";
import { User } from "@prisma/client";

export const View = objectType({
    name: "View",
    definition(t) {
        t.nonNull.field("question", { type: "Question" });
        t.nonNull.field("user", { type: "User" });
    },
});

export const ViewMutation = extendType({  // 2
    type: "Mutation",
    definition(t) {
        t.field("view", {
            type: "View",
            args: {
                qnId: nonNull(intArg()),
            },
            async resolve(parent, args, context){
                const { userId } = context;
                const { qnId } = args

                if (!userId) {
                    throw new Error("Cannot vote without logging in.");
                }

                const question = await context.prisma.question.update({
                    where: {
                        id: qnId,
                    },
                    data: {
                        viewers: {
                            connect: { 
                                id: userId 
                            }
                        }
                    }
                })

                const user = await context.prisma.user.findUnique({
                    where: { id: userId }
                })

                return {
                    question,
                    user: user as User
                };
            },
        });
    }
});