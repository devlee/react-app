import * as React from 'react';

import ReactEcharts from 'echarts-for-react';

import * as axios from 'axios';

class Pc extends React.PureComponent<any, any> {
  constructor() {
    super();
    this.fetch = this.fetch.bind(this);
    this.state = {
      list: [],
      option: {
        backgroundColor: '#2c343c',
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        visualMap: {
          show: false,
          min: 80,
          max: 1200,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' },
            ].sort((a, b) => a.value - b.value),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              },
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 20,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
                smooth: 0.2,
              },
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay(idx) {
              return Math.random() * 200;
            },
          },
        ],
      },
    };
  }

  public fetch() {
    (axios as any).post('/p').then((res) => {
      const { option } = this.state;
      const { series } = option;
      let total = 0;
      res.data.map((item) => {
        total += item.count * 1 * item.price;
        return item;
      });
      const list = res.data.map((item) => {
        const p = ((item.count * 1 * item.price / total) * 100).toFixed(2);
        return {
          name: item.name + ' ' + p + '%',
          value: item.count,
          p,
        };
      });
      this.setState({
        list,
        option: { ...option, series: [{ ...series[0], data: list.sort((a, b) => a.value - b.value) }]},
      });
    });
  }

  public render() {
    const { list, option } = this.state;
    return (
      <div>
        <button onClick={this.fetch}>拉取最新数据</button>
        <ReactEcharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
        />
        {
          list.length ? (
            <ul>
              {
                list.sort((a, b) => b.p - a.p).map((item, idx) => {
                  const key = idx;
                  return (
                    <li key={key}>{item.name}</li>
                  );
                })
              }
            </ul>
          ) : null
        }
      </div>
    );
  }
}

export default Pc;
