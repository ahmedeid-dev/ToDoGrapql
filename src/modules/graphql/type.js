import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const specificNoteType = new GraphQLObjectType({
    name: 'SpecificNote',
    fields: () => ({
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: { type: GraphQLID }
    })
})

export const allUserNotesType = new GraphQLList(specificNoteType)