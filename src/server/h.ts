import axios from 'axios';

const preUrl = 'https://api.huobi.pro/v1/points/pack/';
const r = 'ktff658nfq';
const packs = ['76', '77', '78', '79', '80'];
const packNames = ['100+50ht套餐', '100九折套餐', '1000八折套餐', '10000七折套餐', '100000五折套餐'];

const fns = packs.map((item) => {
  return axios.get(`${preUrl}${item}?r=${r}`);
});

const preUrl2 = 'https://api.huobi.pro/v1/points/pack/list?r=xqq11qp563r&currency=usdt&direct=prev';

const fns2 = [axios.get(preUrl2)];

axios.all(fns2).then(axios.spread((res) => {
  let text = '';
  res.data.data.map((item, idx) => {
    const data = item;
    const diff = (data.quota * 1 - data.sold * 1);
    text += '[' + packNames[idx] + ']\n总份数:' + data.quota + '\n已售份数:' + data.sold + '\n剩余份数:' + diff;
    if (idx === 0) {
      text += '\nHT剩余:' + diff * 50;
    }
    text += '\n';
  });
  console.log(text);
}));
