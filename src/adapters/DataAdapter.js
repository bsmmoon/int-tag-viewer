
class DataAdapter {
  constructor() {
  }

  static import() {
    return {
      logs: [
        { id: 1, description: 'Corgi is cute', time: '2017-03-20 T10:00:00' },
        { id: 2, description: 'I should buy a boat', time: '2017-03-20 T10:01:00' },
        { id: 3, description: 'Go to Constantinople', time: '2017-03-20 T10:02:00' },
      ],
      tags: [
        { name: 'Bucket List', log_ids: [ 2, 3 ] }
      ]
    };
  }
}

export default DataAdapter;
