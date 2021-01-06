<template>
  <div>
    <el-submenu :index="item.index" v-if="!item.toJump && !item.hidden">
      <template slot="title">
        <i class="wz" :class="item.icon"></i>
        <span class="wz">{{ item.name }}</span>
      </template>
      <div :key="index" v-for="(child, index) in item.childrens">
        <el-menu-item
          v-if="!child.childrens && !child.hidden"
          @click="resolvePath(child.path, child.index)"
          :index="child.index"
        >
          <span style="padding-left:8px;">{{ child.name }}</span>
        </el-menu-item>
        <div v-if="child.childrens && !child.hidden">
          <el-submenu :index="child.index" v-if="!child.toJump">
            <template slot="title">
              <span style="padding-left:8px;">{{ child.name }}</span>
            </template>
            <div :key="index" v-for="(child2, index) in child.childrens">
              <el-menu-item
                v-if="!child2.hidden"
                @click="resolvePath(child2.path, child2.index)"
                :index="child2.index"
              >
                <span style="padding-left:12px;">{{ child2.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item  @click="resolvePath(child.path, child.index)" :index="child.index" v-if="child.toJump">
            <span
              style="padding-left:8px;"
              >{{ child.name }}</span
            >
          </el-menu-item>
        </div>
      </div>
    </el-submenu>
    <el-menu-item
      @click="resolvePath(item.path, item.index)"
      :index="item.index"
      v-else-if="item.toJump && !item.hidden"
    >
      <i :class="item.icon"></i>
      <span slot="title" class="wz">{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    resolvePath(url, index) {
      this.$parent.$parent.changeActive(index);
      this.$router.push(url);
    },
    resolveNavActive(index1, index) {
      return index1 + "-" + index;
    },
    hasAllChildHide(child) {
      const r =
        child.childrens && child.childrens.every(s => s.hidden === true);
      return r;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu-item.is-active {
  .icon {
    color: #436fed;
  }
  background: #edf2ff !important;
  border-right: 4px solid #436fed;
}
.el-menu-item:hover {
  .icon {
    color: #436fed;
  }
  background: #edf2ff !important;
  border-right: 4px solid #436fed;
}
.sideber {
  .el-submenu__icon-arrow {
    color: #333;
  }
  .el-submenu.is-active {
    .icon {
      color: #436fed;
    }
  }
  .wz {
    margin-left: 5px;
  }
  .icon {
    color: #333;
  }
}
.nest-menu .el-submenu > .el-submenu__title,
.el-submenu .el-menu-item {
  height: 46px;
  line-height: 46px;
  min-width: 179px !important;
  // background-color: #fff;
  &:hover {
    background: #edf2ff !important;
    border-right: 2px solid #436fed;
    color: #436fed !important;
  }
  &.is-active {
    background: #edf2ff !important;
    border-right: 2px solid #436fed;
    color: #436fed;
  }
}
.el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}
</style>
