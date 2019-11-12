<template>
  <div class="daterangepicker-mobile">
    <div :class="visible ?'daterangepicker-input is-foucs' : 'daterangepicker-input'" @click="show">
      <el-input :placeholder="placeholder" v-model="dateValue"></el-input>
      <!-- <i :class="visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i> -->
    </div>
    <div class="daterangepicker-mask" v-if="visible"></div>
    <div class="daterangepicker-content" v-if="visible">
      <div class="daterangepicker-header">
        <div class="daterangepicker-cell">
          <button :disabled="prevMonthBtnStatus" @click="prev">
            <i class="el-icon-arrow-left"></i>
          </button>
        </div>
        <div class="daterangepicker-cell">
          <h3
            ref="monthYear"
            class="month-year"
          >{{ currentDate.getFullYear() }} 年 {{ months[currentDate.getMonth()] }} 月</h3>
        </div>
        <div class="daterangepicker-cell">
          <button :disabled="nextMonthBtnStatus" @click="next">
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="daterangepicker-body">
        <!-- <div class="daterangepicker-row week-days">
        <div
          v-for="(weekDay, index) in weekDays"
          :key="index"
          class="daterangepicker-cell"
        >{{ weekDay }}</div>
        </div>-->
        <div v-for="(itm, index) in datesArray" :key="index" class="daterangepicker-row">
          <div
            v-for="date in itm"
            :key="date.milis"
            :ref="date.milis"
            :class="date.classes.join(' ')"
            @click="dateClickhandler(date.milis, date.classes)"
            class="daterangepicker-cell"
          >{{ date.day }}</div>
        </div>
      </div>
      <div class="daterangepicker-time">
        <div class="daterangepicker-time-picke">
          <el-time-picker
            is-range
            v-model="timeValue"
            @change="timeChange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </div>
      </div>

      <div class="daterangepicker-button">
        <div class="daterangepicker-button__cancel" @click="visible = false">取消</div>
        <div class="daterangepicker-button__confirm" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
import moment from "moment";
export default {
  name: "PlainCalendar",
  props: {
    maxDate: {
      type: Date,
      default: () => new Date()
    },
    minDate: {
      type: Date,
      default: () => new Date(1970, 0, 1)
    },
    showReset: {
      type: Boolean,
      default: true
    },
    showResult: {
      type: Boolean,
      default: true
    },
    rangeSeparator: {
      type: String,
      default: " 至 "
    },
    placeholder: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: ""
    },
    defaultTime: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
      default: []
    }
  },
  created() {
    this.getDefultDate(this.value);
  },
  watch: {
    defaultTime(val) {
      if (val.length > 0) {
        const startDate =
          moment(this.selectedDates[0]).format("YYYY-MM-DD") + " " + val[0];
        const endDate =
          moment(this.selectedDates[1]).format("YYYY-MM-DD") + " " + val[1];
        this.timeValue = [new Date(startDate), new Date(endDate)];
      } else {
        this.timeValue = ["", ""];
      }
    },
    selectedDates(val) {
      if (val.length > 1) {
        const startDate =
          moment(val[0]).format("YYYY-MM-DD") +
          " " +
          moment(this.timeValue[0]).format("HH:mm:ss");
        const endDate =
          moment(val[1]).format("YYYY-MM-DD") +
          " " +
          moment(this.timeValue[1]).format("HH:mm:ss");
        this.timeValue = [new Date(startDate), new Date(endDate)];
      }
    }
  },
  data() {
    return {
      datesArray: [],
      currentDate: new Date(),
      selectedDates: [],
      months,
      weekDays,
      dateValue: "",
      timeValue: [moment().startOf("day"), moment().endOf("day")],
      visible: false
    };
  },
  computed: {
    nextMonthLabel() {
      const { currentDate: crDt } = this;
      const monthIdx = new Date(
        crDt.getFullYear(),
        crDt.getMonth() + 1,
        1
      ).getMonth();
      return months[monthIdx];
    },
    prevMonthLabel() {
      const { currentDate: crDt } = this;
      const monthIdx = new Date(
        crDt.getFullYear(),
        crDt.getMonth() - 1,
        1
      ).getMonth();
      return months[monthIdx];
    },
    nextMonthBtnStatus() {
      const { maxDate, currentDate } = this;
      if (maxDate) {
        const currentMonthEnd = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        return maxDate ? +currentMonthEnd >= +maxDate : false;
      }
      return false;
    },
    prevMonthBtnStatus() {
      const { minDate, currentDate } = this;
      const prevMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      return +prevMonthEnd <= +minDate;
    }
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    show() {
      this.visible = true;
    },
    confirm() {
      this.visible = false;
      this.getFormatDate();
    },
    timeChange(val) {},
    getDefultDate(val) {
      if (val.length > 0) {
        const startDate = moment(val[0]).format("YYYY-MM-DD HH:mm:ss");
        const endDate = moment(val[1]).format("YYYY-MM-DD HH:mm:ss");
        this.timeValue = [startDate, endDate];
        this.dateValue =
          this.timeValue[0] + this.rangeSeparator + this.timeValue[1];
        this.selectedDates = [new Date(startDate), new Date(endDate)];
        this.markDates([new Date(startDate), new Date(endDate)]);
      }
    },
    getFormatDate() {
      const startDate = moment(new Date(this.timeValue[0])).format(this.format);
      const endDate = moment(new Date(this.timeValue[1])).format(this.format);
      this.dateValue = startDate + this.rangeSeparator + endDate;
      this.$emit("input", this.timeValue);
      return [startDate, endDate];
    },
    initCalendar() {
      const { currentDate } = this;
      this.showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    },
    selectedClick(currMonthDate) {
      if (
        moment(currMonthDate).format("YYYY-MM-DD") ===
        moment(this.value[0]).format("YYYY-MM-DD")
      ) {
        return +new Date(moment(this.value[0]).format("YYYY-MM-DD HH:mm:ss"));
      } else if (
        moment(currMonthDate).format("YYYY-MM-DD") ===
        moment(this.value[1]).format("YYYY-MM-DD")
      ) {
        return +new Date(moment(this.value[1]).format("YYYY-MM-DD HH:mm:ss"));
      } else {
        return +currMonthDate;
      }
    },
    showCalendar(year, month) {
      // reset
      this.datesArray = [];

      const edgeMonthDate = new Date(year, month + 1, 0);
      let currMonthDate = new Date(year, month, 1);
      let iter = 0;
      let rowCount = 0;
      let ready = true;
      let rowArray = [];

      if (currMonthDate.getDay() !== 0) {
        iter = iter - currMonthDate.getDay();
      }

      while (ready) {
        if (currMonthDate.getDay() === 6 && rowArray.length > 0) {
          this.datesArray.push(rowArray);
          rowArray = [];
        }
        currMonthDate = new Date(year, month, ++iter);
        const dateObj = {
          day: currMonthDate.getDate(),
          classes: [],
          milis: this.selectedClick(currMonthDate)
        };

        // add .offset class if it's not current month's date
        if (iter < 1 || +currMonthDate > +edgeMonthDate) {
          dateObj.classes.push("offset");
        }
        // add .disabled class if it's beyond maxDate
        if (this.maxDate && +currMonthDate > +this.maxDate) {
          dateObj.classes.push("disabled");
        }
        rowArray.push(dateObj);
        if (currMonthDate.getDay() === 6) {
          rowCount++;
        }

        // stop iteration when it's reaching next month and a full row
        if (
          +currMonthDate > +edgeMonthDate &&
          currMonthDate.getDay() === 6 &&
          rowCount === 7
        ) {
          ready = false;
          rowCount = 0;
        }
      }

      this.selectedDates.length > 0 && this.markDates(this.selectedDates);
    },
    dateClickhandler(milis, classes) {
      const { selectedDates, resetMarks, addSelectedDate } = this;
      if (!classes.includes("disabled")) {
        // none or 1 date selected, push current selected date
        if (selectedDates.length < 2) {
          addSelectedDate(milis);
        } else if (selectedDates.length === 2) {
          // if both ends have selected and another click triggered, reset
          resetMarks();
          addSelectedDate(milis);
        }
      }
    },
    addSelectedDate(milis) {
      const { selectedDates, markDates } = this;
      // var nom = this.$refs[milis]
      selectedDates.push(new Date(milis));

      // if there's already a date selected, check milis to decide start/end date
      if (selectedDates.length === 2) {
        +selectedDates[0] > +selectedDates[1] && selectedDates.reverse();
      }

      // mark dates
      markDates(selectedDates);
    },
    markDates(dates) {
      const { datesArray } = this;
      let idx = 0;

      // iterate to dates array
      while (idx < datesArray.length) {
        datesArray[idx].forEach(item => {
          // if only one date passed, mark first date only
          if (dates.length === 1) {
            if (item.milis === +dates[0]) {
              item.classes.push("clicked");
            }
          }
          // if two dates passed, mark both dates and in-betweens
          if (dates.length === 2) {
            if (item.milis >= +dates[0] && item.milis <= +dates[1]) {
              item.classes.push("in-range");
            }
            if (item.milis === +dates[0] || item.milis === +dates[1]) {
              !item.classes.includes("clicked") && item.classes.push("clicked");
            }
          }
        });
        idx++;
      }
    },
    resetMarks() {
      const { currentDate } = this;
      this.selectedDates = [];
      this.showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    },
    next() {
      const { currentDate, showCalendar } = this;
      this.currentDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1)
      );
      showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    },
    prev() {
      const { currentDate, showCalendar } = this;
      this.currentDate = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1)
      );
      showCalendar(currentDate.getFullYear(), currentDate.getMonth());
    }
  }
};
</script>

<style scoped>
.daterangepicker-input {
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  position: relative;
}

.daterangepicker-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
}

.daterangepicker-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
}

.daterangepicker-button {
  height: 38px;
  line-height: 38px;
  color: #606266;
  border-top: 1px solid #dcdfe6;
}
.daterangepicker-button div {
  height: 38px;
  width: 50%;
  text-align: center;
  float: left;
}

.daterangepicker-button__confirm {
  color: #436fed;
}

.daterangepicker-input i {
  font-size: 16px;
  color: #c0c4cc;
  right: 12px;
  top: 8px;
  position: absolute;
}

.daterangepicker-mobile {
  font-family: sans-serif;
}
.daterangepicker-header {
  max-width: 322px;
  display: table;
  width: 100%;
}
.daterangepicker-header button {
  background: transparent;
  border: none;
  font-size: 15px;
}
.daterangepicker-header .daterangepicker-cell {
  cursor: default;
}
.daterangepicker-body {
  display: table;
  width: 100%;
}

.daterangepicker-time {
  margin: 10px 25px;
}

.daterangepicker-time label {
  display: inline-block;
  color: #c0c4cc;
}

.daterangepicker-time .daterangepicker-time-picke {
  display: inline-block;
  text-align: center;
}

.daterangepicker-time .daterangepicker-time-picke .inline {
  display: inline-block;
  width: 40%;
}

.daterangepicker-time .daterangepicker-time-picke span.inline {
  width: 20px;
  text-align: center;
}

.daterangepicker-time-picke .inline .el-date-editor.el-input,
.daterangepicker-time-picke .inline .el-date-editor.el-input__inner {
  width: 100%;
}

.daterangepicker-row {
  display: table-row;
}
.week-days .daterangepicker-cell {
  padding: 10px 2px;
}
.daterangepicker-cell {
  display: table-cell;
  padding: 5px;
  min-width: 34px;
  min-height: 36px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  color: #606266;
}
.offset {
  color: lightgray;
}
.clicked {
  background: #409eff;
  color: white;
}
.daterangepicker-cell.in-range:not(.clicked) {
  color: #606266;
  background: #f2f6fc;
}
.daterangepicker-cell.disabled {
  color: #c0c4cc;
}
</style>
