import { REPORT_ACTION } from '../actions/ReportActions.js'
const COLOR_DEFAULT = "#FFFFFF";
const COLOR_ACTIVE = "#3B4EDC";
const COLUMN_PER_PAGE = 5;




var labels = [];
var datas = [];
var colorDefault = [];
for (let i = 0; i < 200; i++) {
  let label = "T" + i;
  let data = (Math.floor(Math.random() * 1000) / 1000) * 1000000;
  labels.push(label);
  datas.push(data);
  colorDefault.push(COLOR_DEFAULT);
}

const dataChart = {
  label: labels,
  data: datas
};

const initArrColorCorespondingLengthOfData = (length) => {
  var array = [];
  for (var i = 0; i < length - 1; i++) {
    array.push(COLOR_DEFAULT)
  }
  array.push(COLOR_ACTIVE)
  return array;
}

const dataShowByPageIndex = (pageIndex, totalData) => {
  const totalDataLength = totalData.label.length
  if (totalDataLength < 5) return totalData;
  var label = totalData.label;
  var data = totalData.data;
  var start = totalDataLength - (pageIndex + 1) * COLUMN_PER_PAGE;
  var end = totalDataLength - pageIndex * COLUMN_PER_PAGE
  if (start < 0) start = 0;

  return {
    label: label.slice(start, end),
    data: data.slice(start, end)
  }
}

const sliceArray = (pageIndex, array) => {
  let length = array.length; // 0 3
  var start = length - (pageIndex + 1) * COLUMN_PER_PAGE;
  var end = length - pageIndex * COLUMN_PER_PAGE
  if (start < 0) start = 0;
  var result = array.slice(start, end);
  return result
}

const getMaxPageIndex = (length) => {
  var page = Math.floor(length / COLUMN_PER_PAGE);
  if (page === 0) return page;
  if (length % COLUMN_PER_PAGE === 0) page -= 1;
  return page;
}

var currentState = {
  totalChartDataDay: [],
  pageIndexChartDataDay: 0,
  maxPageChartDay: 0,
  showChartDataDay: [],
  colorChartDay: colorDefault,
  showChartColorDay: sliceArray(0, colorDefault),
  summaryDay: {
    label: "",
    price: 0,
    booking: 0
  },
  activeIndexDay: 0,
  dailyYear: new Date().getFullYear(),
  dailyMonth: new Date().getMonth() + 1,
  listCompleteDay: [],

  totalChartDataMonth: [],
  pageIndexChartDataMonth: 0,
  maxPageChartMonth: 0,
  showChartDataMonth: [],
  colorChartMonth: colorDefault,
  showChartColorMonth: sliceArray(0, colorDefault),
  summaryMonth: {
    time: "",
    total_income: 0,
    total_booking: 0
  },
  activeIndexMonth: 0,
  monthlyYear: new Date().getFullYear(),
  listCompleteMonth: [],

  totalChartDataYear: [],
  pageIndexChartDataYear: 0,
  maxPageChartYear: 0,
  showChartDataYear: [],
  colorChartYear: colorDefault,
  showChartColorYear: sliceArray(0, colorDefault),
  summaryYear: {
    time: "",
    total_income: 0,
    total_booking: 0
  },
  activeIndexYear: 0,
  listCompleteYear: [],

}

function ReportReducer(state = currentState, action) {
  switch (action.type) {
    case REPORT_ACTION.FETCH_CHART_DATA_DAY:
      var length = action.data.label.length;
      var colorChartDay = initArrColorCorespondingLengthOfData(length);
      console.log("REPORT_ACTION.FETCH_CHART_DATA_DAY", colorChartDay)
      var showChartColorDay = sliceArray(state.pageIndexChartDataDay, colorChartDay)
      var summaryDay = {
        label: action.data.label[length - 1],
        price: action.data.data[length - 1],
        booking: action.data.booking[length - 1],
      }

      return {
        ...state,
        showChartColorDay: showChartColorDay,
        activeIndexDay: length - 1,
        summaryDay: summaryDay,
        maxPageChartDay: getMaxPageIndex(action.data.data.length),
        colorChartDay: colorChartDay,
        showChartDataDay: dataShowByPageIndex(0, action.data),
        totalChartDataDay: action.data
      }

    case REPORT_ACTION.FETCH_CHART_DATA_MONTH:
      var length = action.data.label.length;
      var colorChartMonth = initArrColorCorespondingLengthOfData(length);
      var showChartColorMonth = sliceArray(state.pageIndexChartDataMonth, colorChartMonth)

      console.log('xxxx', colorChartMonth)
      var summaryMonth = {
        label: action.data.label[length - 1],
        price: action.data.data[length - 1],
        booking: action.data.booking[length - 1],
      }
      return {
        ...state,
        showChartColorMonth: showChartColorMonth,
        activeIndexMonth: length - 1,
        summaryMonth: summaryMonth,
        maxPageChartMonth: getMaxPageIndex(action.data.data.length),
        colorChartMonth: colorChartMonth,
        showChartDataMonth: dataShowByPageIndex(0, action.data),
        totalChartDataMonth: action.data
      }

    case REPORT_ACTION.FETCH_CHART_DATA_YEAR:
      var length = action.data.label.length;
      var colorChartYear = initArrColorCorespondingLengthOfData(length);
      var showChartColorYear = sliceArray(state.pageIndexChartDataYear, colorChartYear)
      var summaryYear = {
        label: action.data.label[length - 1],
        price: action.data.data[length - 1],
        booking: action.data.booking[length - 1],
      }
      return {
        ...state,
        showChartColorYear: showChartColorYear,
        activeIndexYear: length - 1,
        summaryYear: summaryYear,
        maxPageChartYear: getMaxPageIndex(action.data.data.length),
        colorChartYear: colorChartYear,
        showChartDataYear: dataShowByPageIndex(0, action.data),
        totalChartDataYear: action.data
      }

    case REPORT_ACTION.INCRE_PAGE_INDEX_DAY:
      console.log("REPORT_ACTION.INCRE_PAGE_INDEX_DAY", state.pageIndexChartDataDay, state.maxPageChartDay)
      if (state.pageIndexChartDataDay === state.maxPageChartDay) return { ...state }
      var showChartColorDay = sliceArray(state.pageIndexChartDataDay + 1, state.colorChartDay)
      return {
        ...state,
        pageIndexChartDataDay: state.pageIndexChartDataDay + 1,
        showChartColorDay: [...showChartColorDay],
        showChartDataDay: dataShowByPageIndex(state.pageIndexChartDataDay + 1, state.totalChartDataDay),
      }

    case REPORT_ACTION.INCRE_PAGE_INDEX_MONTH:
      if (state.pageIndexChartDataMonth === state.maxPageChartMonth) return { ...state }
      var showChartColorMonth = sliceArray(state.pageIndexChartDataMonth + 1, state.colorChartMonth)
      return {
        ...state,
        pageIndexChartDataMonth: state.pageIndexChartDataMonth + 1,
        showChartColorMonth: [...showChartColorMonth],
        showChartDataMonth: dataShowByPageIndex(state.pageIndexChartDataMonth + 1, state.totalChartDataMonth),
      }

    case REPORT_ACTION.INCRE_PAGE_INDEX_YEAR:
      if (state.pageIndexChartDataYear === state.maxPageChartYear) return { ...state }
      var showChartColorYear = sliceArray(state.pageIndexChartDataYear + 1, state.colorChartYear)
      return {
        ...state,
        pageIndexChartDataYear: state.pageIndexChartDataYear + 1,
        showChartColorYear: [...showChartColorYear],
        showChartDataYear: dataShowByPageIndex(state.pageIndexChartDataYear + 1, state.totalChartDataYear),

      }

    case REPORT_ACTION.REDUCE_PAGE_INDEX_DAY:
      if (state.pageIndexChartDataDay === 0) return { ...state }
      var showChartColorDay = sliceArray(state.pageIndexChartDataDay - 1, state.colorChartDay)
      return {
        ...state,
        pageIndexChartDataDay: state.pageIndexChartDataDay - 1,
        showChartColorDay: [...showChartColorDay],
        showChartDataDay: dataShowByPageIndex(state.pageIndexChartDataDay - 1, state.totalChartDataDay),
      }

    case REPORT_ACTION.REDUCE_PAGE_INDEX_MONTH:
      if (state.pageIndexChartDataMonth === 0) return { ...state }
      var showChartColorMonth = sliceArray(state.pageIndexChartDataMonth - 1, state.colorChartMonth)
      return {
        ...state,
        pageIndexChartDataMonth: state.pageIndexChartDataMonth - 1,
        showChartColorMonth: [...showChartColorMonth],
        showChartDataMonth: dataShowByPageIndex(state.pageIndexChartDataMonth - 1, state.totalChartDataMonth),
      }

    case REPORT_ACTION.REDUCE_PAGE_INDEX_YEAR:
      if (state.pageIndexChartDataYear === 0) return { ...state }
      var showChartColorYear = sliceArray(state.pageIndexChartDataYear - 1, state.colorChartYear)
      return {
        ...state,
        pageIndexChartDataYear: state.pageIndexChartDataYear - 1,
        showChartColorYear: [...showChartColorYear],
        showChartDataYear: dataShowByPageIndex(state.pageIndexChartDataYear - 1, state.totalChartDataYear),
      }

    case REPORT_ACTION.UPDATE_ACTIVE_INDEX_DAY:
      var colorChartDay = state.colorChartDay;
      var maxIndex = colorChartDay.length - 1;
      var clickedIndex = maxIndex - (COLUMN_PER_PAGE - 1 - action.data + state.pageIndexChartDataDay * COLUMN_PER_PAGE);
      if (colorChartDay.length < COLUMN_PER_PAGE || clickedIndex < 0) clickedIndex = action.data
      colorChartDay[state.activeIndexDay] = COLOR_DEFAULT
      colorChartDay[clickedIndex] = COLOR_ACTIVE
      var showChartColorDay = sliceArray(state.pageIndexChartDataDay, colorChartDay)
      var summaryDay = {
        label: state.totalChartDataDay.label[clickedIndex],
        price: state.totalChartDataDay.data[clickedIndex],
        booking: state.totalChartDataDay.booking[clickedIndex],
      }

      return {
        ...state,
        showChartColorDay: [...showChartColorDay],
        summaryDay: summaryDay,
        colorChartDay: [...colorChartDay],
        activeIndexDay: clickedIndex
      }
    case REPORT_ACTION.UPDATE_ACTIVE_INDEX_MONTH:
      var colorChartMonth = state.colorChartMonth;
      var maxIndex = colorChartMonth.length - 1;
      var clickedIndex = maxIndex - (COLUMN_PER_PAGE - 1 - action.data + state.pageIndexChartDataMonth * COLUMN_PER_PAGE);
      if (colorChartMonth.length < COLUMN_PER_PAGE || clickedIndex < 0) clickedIndex = action.data //err
      colorChartMonth[state.activeIndexMonth] = COLOR_DEFAULT
      colorChartMonth[clickedIndex] = COLOR_ACTIVE
      var showChartColorMonth = sliceArray(state.pageIndexChartDataMonth, colorChartMonth); //err
      console.log("UPDATE_ACTIVE_INDEX_MONTH", colorChartMonth, showChartColorMonth, clickedIndex, state.totalChartDataMonth)
      var summaryMonth = {
        label: state.totalChartDataMonth.label[clickedIndex],
        price: state.totalChartDataMonth.data[clickedIndex],
        booking: state.totalChartDataMonth.booking[clickedIndex],
      }
      return {
        ...state,
        showChartColorMonth: [...showChartColorMonth],
        summaryMonth: summaryMonth,
        colorChartMonth: [...colorChartMonth],
        activeIndexMonth: clickedIndex
      }
    case REPORT_ACTION.UPDATE_ACTIVE_INDEX_YEAR:
      var colorChartYear = state.colorChartYear;
      var maxIndex = colorChartYear.length - 1;
      var clickedIndex = maxIndex - (COLUMN_PER_PAGE - 1 - action.data + state.pageIndexChartDataYear * COLUMN_PER_PAGE);
      if (colorChartYear.length < COLUMN_PER_PAGE || clickedIndex < 0) clickedIndex = action.data
      console.log("UPDATE_ACTIVE_INDEX_YEAR", clickedIndex)
      colorChartYear[state.activeIndexYear] = COLOR_DEFAULT
      colorChartYear[clickedIndex] = COLOR_ACTIVE
      var showChartColorYear = sliceArray(state.pageIndexChartDataYear, colorChartYear);
      var summaryYear = {
        label: state.totalChartDataYear.label[clickedIndex],
        price: state.totalChartDataYear.data[clickedIndex],
        booking: state.totalChartDataYear.booking[clickedIndex],
      }
      return {
        ...state,
        showChartColorYear: [...showChartColorYear],
        summaryYear: summaryYear,
        colorChartYear: [...colorChartYear],
        activeIndexYear: clickedIndex
      }
    case REPORT_ACTION.UPDATE_DAILY_MONTH:
      return {
        ...state,
        dailyMonth: action.data
      }
    case REPORT_ACTION.UPDATE_DAILY_YEAR:
      return {
        ...state,
        dailyYear: action.data
      }
    case REPORT_ACTION.UPDATE_MONTHLY_YEAR:
      return {
        ...state,
        monthlyYear: action.data
      }
    case REPORT_ACTION.FETCH_LIST_COMPLETE_DAY:
      console.log("XXXXXXXXX", action.data)
      return {
        ...state,
        listCompleteDay: action.data
      }
    case REPORT_ACTION.FETCH_LIST_COMPLETE_MONTH:
      return {
        ...state,
        listCompleteMonth: action.data
      }
    case REPORT_ACTION.FETCH_LIST_COMPLETE_YEAR:
      return {
        ...state,
        listCompleteYear: action.data
      }
    default:
      return { ...state }
  }

}

export default ReportReducer
