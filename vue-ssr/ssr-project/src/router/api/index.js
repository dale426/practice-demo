
import axios from 'axios'

export function queryData () {
  return axios({
    method: 'get',
    url: 'http://localhost:8011/api',
    data: {
      name: 'demoData'
    }
  })
/*     .then(function (res) {
      resolve
    })
    .catch(function (error) {
      console.log(error)
    }) */
}
