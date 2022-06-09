import { extendType, nonNull, objectType, stringArg, intArg } from "nexus";  
import { NexusGenObjects } from "../../nexus-typegen"; 

export const Question = objectType({
    name: "Question",
    definition(t){
        t.nonNull.int("id");
        t.nonNull.string("question");
        t.nonNull.string("answer");
        t.nonNull.dateTime("createdAt");
        t.field("createdBy", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.question
                    .findUnique({ where: { id: parent.id }})
                    .createdBy();
            }
        });
        t.nonNull.list.nonNull.field("viewers", {
            type: "User",
            resolve(parent, args, context) {
                return context.prisma.question
                    .findUnique({ where: { id: parent.id }})
                    .viewers();
            }
        })
    }
});

export const QuestionQuery = extendType({  
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("allQuestions", {   
            type: "Question",
            args: {
                filter: stringArg(),
            },
            resolve(parent, args, context) {
                const where = args.filter  
                    ? {
                          OR: [
                              { question: { contains: args.filter } },
                              { answer: { contains: args.filter } },
                          ],
                      }
                    : {};   
                return context.prisma.question.findMany({
                    where,
                });
            },
        });
    },
});

export const QuestionMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Question",  
            args: { 
                question: nonNull(stringArg()),
                answer: nonNull(stringArg()),
            },
            
            resolve(parent, args, context) {    
                const { question, answer } = args;
                const { userId } = context;

                if(!userId){
                    throw new Error("Cannot create without logging in")
                }
                const newQuestion = context.prisma.question.create({
                    data: {
                        question: question,
                        answer: answer,
                        createdBy: { connect: { id: userId}},
                    }
                })  
                return newQuestion;
            },
        });
    },
})