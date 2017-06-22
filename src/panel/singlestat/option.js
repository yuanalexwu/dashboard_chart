const option = {
  series: {
    gauges: {
      show: true,
      label: {
        show: false,
        margin: null,
        color: null,
        formatter: function (label, value) { return `${label}-${value}` }
      },
      threshold: {
        show: false,
        width: 5,
        label: {
          show: true,
          margin: 0,
          background: {
            color: null,
            opacity: 0,
          },
          font: {
            size: 16
          },
          color: '',
          formatter: function (value) { return `${value}` }
        },
        values: [
          {value: 50, color: '#01aa32'},
          {value: 80, color: '#df762b'},
          {value: 100, color: '#eb3035'},
        ],
      },
      gauge: {
        width: 50,
        min: 0,
        max: 100,
        border: {
          width: 0,
          color: null
        },
        background: {
          color: '#262626',
        },
      },
      value: {
        show: false,
      },
      frame: {show: false},
      cell: {
        background: {
          color: '',
        },
        border: {
          show: true,
          color: 'red',
          width: 0,
        }
      },
    }
  }
}

export default option
