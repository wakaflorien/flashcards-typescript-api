import { objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.nonNull.list.nonNull.field("questions", {
            type: "Question",
            resolve(parent, args, context) { 
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .questions();
            },
        });
        t.nonNull.list.nonNull.field("views", {
            type: "Question",
            resolve(parent, args, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .views();
            }
        }) 
    },
});