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
    let tags = {
      'Travel': {id: 'Travel', name: 'Travel', logIds: []},
      'Bucket List': {id: 'Bucket List', name: 'Bucket List', logIds: []},
    };
    let logLines = {};
    [
      {description: 'Go to Constantinople', time: '2017-03-20 T10:02:00:000', tags: ['Bucket List', 'Travel']},
      {description: 'I should buy a boat', time: '2017-03-20 T10:01:00:000', tags: ['Bucket List']},
      {description: 'Corgi is cute', time: '2017-03-20 T10:00:00:000', tags: []},
    ].forEach(function(logLineData) {
      let time = logLineData.time;
      let id = StringService.hashCode([logLineData.description, time].join(' '));
      let logLine = Object.assign(logLineData, {
        id: id,
      });
      logLines[logLine.id] = logLine;
      logLine.tags.forEach(function(tag) {
        tags[tag].logIds.push(logLine.id);
      });
    });
    let listDetails = {
      name: 'Test List',
      description: 'This is a mock list for development',
      tags: 'Not selected',
      filters: 'Not selected',
      timeRange: 'Not selected',
    };
    return {
      listDetails: listDetails,
      logLines: logLines,
      tags: tags,
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
      tags: [],
    });
    return logLine;
  }
}

export default DataAdapter;
