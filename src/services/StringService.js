/**
 * tools for string manipulation
 */
class StringService {
  /**
   * hash function... for fun!
   * @param {*} str string to be hashed
   * @param {*} len length of the desired hash
   * @return {string} hash
   */
  static hashCode(str, len=6) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(32).slice(-len);
  }

  /**
   * get current time string
   * @return {string} date now in string format
   */
  static dateNow() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let hh = today.getHours();
    let MM = today.getMinutes();
    let ss = today.getSeconds();
    let ms = today.getMilliseconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (MM < 10) MM = '0' + MM;
    if (ss < 10) ss = '0' + ss;
    if (ms < 10) ms = '00' + ms;
    else if (ms < 100) ms = '0' + ms;
    return [yyyy, '-', mm, '-', dd, ' T', hh, ':', MM, ':', ss, ':', ms].join('');
  }
}

export default StringService;
