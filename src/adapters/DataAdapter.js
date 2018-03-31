import StringService from '../services/StringService';

/**
 * Adapter to data sources that encapsulates external communications.
 * Currently it is stateful because there is no database
 */
class DataAdapter {
  /**
   */
  constructor() {
    this.dataSource = DataAdapter.placeholderData();
  }

  /**
   * @return {object} data needed by the app
   */
  import() {
    return JSON.parse(JSON.stringify(this.dataSource));
  }

  /**
   * @param {object} opts options
   * @return {object} data needed by the app
   */
  reimport(opts) {
    let data = this.import();
    if (!!opts.tags) {
      if (opts.tags.length > 0) {
        let logLines = {};
        opts.tags.forEach(function(tag) {
          data.tags[tag].logIds.forEach(function(logId) {
            logLines[logId] = data.logLines[logId];
          });
        });
        data.logLines = logLines;
      }
      data.listDetails.tags = opts.tags;
    }
    return data;
  }

  /**
   * how LogLine is created is hidden behind this function.
   * when actual thing is implemented update accordingly
   * @param {object} logLineData hi
   * @return {object} object of new LogLine
   */
  createLogLine(logLineData) {
    logLineData.description = logLineData.description.trim();
    if (logLineData.description.length === 0) return;
    let time = StringService.dateNow();
    let id = StringService.hashCode([logLineData.description, time].join(' '));
    let logLine = Object.assign(logLineData, {
      id: id,
      time: time,
      tags: [],
    });
    this.dataSource.logLines[logLine.id] = logLine;
    return logLine;
  }

  /**
   * set tags to LogLine. if necessary create new tags.
   * @param {*} logLineId id
   * @param {*} logLineTags list of name of tags
   * @return {object} logLines with tags updated and tags with longLines updated
   */
  setTagsToLogLine(logLineId, logLineTags) {
    let data = this.import();
    let logLines = data.logLines;
    let tags = data.tags;
    logLines[logLineId].tags = logLineTags;
    for (let logLineTag of logLineTags) {
      if (!tags[logLineTag]) {
        // new tag
        tags[logLineTag] = {
          id: logLineTag,
          name: logLineTag,
          logIds: [logLineId],
        };
      } else {
        // existing tag
        tags[logLineTag].logIds.push(logLineId);
      }
    }
    this.dataSource.logLines = logLines;
    this.dataSource.tags = tags;
    return {
      logLines: logLines,
      tags: tags,
    };
  }

  /**
   * make placeholder data for development
   * @param {object} opts options
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
      id: 1,
      name: 'Test List',
      description: 'This is a mock list for development',
      tags: [],
      filters: 'Not selected',
      timeRange: 'Not selected',
    };
    return {
      listDetails: listDetails,
      logLines: logLines,
      tags: tags,
    };
  }
}

export default DataAdapter;
