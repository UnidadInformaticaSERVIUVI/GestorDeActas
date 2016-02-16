exports.models = {

  Acta: {
    id: 'Acta',
    required: ['content', 'title'],
    properties: {
   
      title: {
        type: 'string',
        description: 'Title of the acta'
      },
      content: {
        type: 'string',
        description: 'content of the acta'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the acta'
      }
    }
  }
};
