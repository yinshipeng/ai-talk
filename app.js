const md5 = require('md5')
const request = require('request')

const appkey = 'suICAbvmRApKeZMG';
let params = {
  'app_id': 2111406154,
  'session': '10000000',
  'question': '你叫啥',
  'time_stamp': Date.parse(new Date())/1000,
  'nonce_str': Math.random().toString(36).substring(2),
  'sign': ''
}

function getReqSign(params, appKey) {
  let keys = Object.keys(params).sort()
  let sign = ''
  for (let key of keys) {
    let value = params[key]
    if (value) {
		sign += key + '=' + encodeURIComponent(value) + '&'
    }
  }
  sign += 'app_key=' + appKey
  console.log(sign)
  return md5(sign).toLocaleUpperCase()
}
params['sign'] = getReqSign(params, appkey)

function doHttpPost() {
  let options = {
    url: 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat',
    method: 'POST',
    strictSSL: false,
    timeout: 1500,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: params
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log(err)
    } else {
      console.log(body)
    }
  })
}

doHttpPost()
