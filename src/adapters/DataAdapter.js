import StringService from '../services/StringService';

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
      {id: 3, description: 'Go to Constantinople', time: '2017-03-20 T10:02:00:000', tagIds: ['Bucket List', 'Travel']},
      {id: 2, description: 'I should buy a boat', time: '2017-03-20 T10:01:00:000', tagIds: ['Bucket List']},
      {id: 1, description: 'Corgi is cute', time: '2017-03-20 T10:00:00:000', tagIds: []},
    ];
    let list = {
      name: 'Test List',
      description: 'This is a mock list for development',
      tags: 'Not selected',
      filters: 'Not selected',
      timeRange: 'Not selected',
      logs: logs,
    };
    return {
      list: list,
      tags: {
        'Travel': {id: 'Travel', name: 'Travel', logIds: [3]},
        'Bucket List': {id: 'Bucket List', name: 'Bucket List', logIds: [2, 3]},
      },
    };
  }

  /**
   * how LogLine is created is hidden behind this function.
   * when actual thing is implemented update accordingly
   * @param {object} logLineData hi
   * @return {object} object of new LogLine
   */
  static createLogLine(logLineData) {
    logLineData.description = logLineData.description.trim();
    if (logLineData.description.length === 0) return;
    let time = StringService.dateNow();
    let id = StringService.hashCode([logLineData.description, time].join(' '));
    let logLine = Object.assign(logLineData, {
      id: id,
      time: time,
    });
    return logLine;
  }
}

export default DataAdapter;
