export const swaggerOptions = {
  explorer : true ,
  swaggerOptions : {
    authAction : {
      JWT : {
        name : 'JWT' ,
        schema : {
          type : 'apiKey' ,
          in : 'header' ,
          name : 'Authorization' ,
          description : ''
        } ,
        value : 'Portador <meu próprio token JWT>'
      }
    }
  }
}
