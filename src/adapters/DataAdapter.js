
/**
 * Adapter to data sources that encapsulates external communications.
 */
class DataAdapter {
  /**
   * import
   * @return {object} data needed by the app
   */
  static import() {
    const data = this.placeholderData();
    return data;
  }

  /**
   * make placeholder data for development
   * @return {object} placeholder data for development
   */
  static placeholderData() {
    let logs = [
      {id: 3, description: 'Go to Constantinople', time: '2017-03-20 T10:02:00'},
      {id: 2, description: 'I should buy a boat', time: '2017-03-20 T10:01:00'},
      {id: 1, description: 'Corgi is cute', time: '2017-03-20 T10:00:00'},
    ];
    let list = {
      name: 'Name of the Current List',
      description: 'Description of the Current List',
      tags: 'Applied Tags / Rules',
      filters: 'Additional Filters',
      time_range: 'Time Range Options',
      logs: logs,
    };
    return {
      list: list,
      tags: [
        {name: 'Bucket List', log_ids: [2, 3]},
      ],
    };
  }
}

export default DataAdapter;
