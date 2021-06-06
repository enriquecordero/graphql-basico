const express = require('express');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, graphql, GraphQLInt} = require('graphql')
const app = express();

//settings
app.set('port',3000)


//Graphql Schema

const courseType = new GraphQLObjectType({
    name: "Course",
    fields:{
        titulo: {  type: GraphQLString},
        vistas: { type:GraphQLInt}
    }    
});


const schema = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields:{
            message: {
                type: GraphQLString,
                resolve(){
                    return "Hola Mundo";
                }
            },//end message
            course: {
                type: courseType,
                resolve(){
                    return { titulo: "Curso de Graphql", vistas: 1000 }
                }
            } // end course 

        }
    })
});

app.get('/',(req,res)=>{
//res.send('Hola Mundo');
graphql(schema, '{ message, course{titulo,vistas} }').then(r => res.json(r)).catch(res.json);


});

app.listen(app.get('port'), () => {

    console.log('Server on' , app.get('port'));
})