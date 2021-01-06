import Tool from "@/utils/Tool";
let asyncRouter = [];
const needAuthRouter = [];

const crossAuth = {};
const crKey = ["_parent", "index", "_zOne", "jump"];

const setCrossAuth = router => {
  return router.map(vr => {
    if (crossAuth.hasOwnProperty(vr.__atp)) {
      vr.meta = Object.assign({}, vr.meta, crossAuth[vr.__atp]);
    }
    return vr;
  });
};

const getAsyncRouter = data => {
  if (data.length > 0) {
    let tree = Tool.toTreeData(data, {
      parentId: "parentId",
      id: "resourceId",
      rootId: 0
    });

    tree = Tool.compare(tree, "sort");
    const calleeRoute = (parent, router, i, exeUrl) => {
      const meta = {};
      const R = Tool.compare(router, "sort");
      const level = R.map((lv1, i2) => {
        const level1 = {};
        level1.meta = {};
        level1.meta.auth = true;
        level1.path = exeUrl.replace(/\/(index|list)/, "") + lv1.href;
        level1.name = lv1.title;
        level1.icon = lv1.icon;
        level1.hidden = !lv1.showFlag;
        level1.index = i + "-" + i2;
        level1.meta.index = i + "-" + i2;
        level1.meta._parent = level1.meta._parent
          ? level1.meta._parent.concat(parent)
          : [].concat(parent);

        level1.component = () => import("@/views" + level1.path);
        const btn =
          lv1.operate && lv1.operate.match(/atb\s*:\s*(["a-zA-Z-,]+?\")/gi);

        const atp =
          lv1.operate && lv1.operate.match(/atp\s*:\s*(["a-zA-Z-,]+?\")/gi);
        if (atp) {
          const ap = atp[0].replace(/atp\s*:\s*/gi, "").replace(/\"/gi, "");
          level1.__atp = ap;
        }

        if (btn) {
          const m = btn[0]
            .replace(/atb\s*:\s*/gi, "")
            .replace(/\"/gi, "")
            .split(",");
          m.forEach((r, index) => {
            const n = r;
            meta[n] = true;
          });
        }

        const keepAlive =
          lv1.operate && lv1.operate.match(/keepAlive\s*:\s*(true)\b/gi);
        if (keepAlive) {
          meta["keepAlive"] = true;
        }

        if (lv1.children) {
          if (lv1.children.every(r => r.showFlag === false)) {
            level1.meta.jump = true;
            level1.toJump = true;
            if (lv1.children.some(r => r.href !== null && r.href !== "")) {
              level1._subIndex = level1.index;
            }
          } else {
            level1.meta.jump = false;
            level1.toJump = false;
          }
          const c = calleeRoute(
            level1,
            lv1.children,
            level1.index,
            level1.path
          );

          level1.childrens = c.level;
          level1.meta = Object.assign(level1.meta, c.meta);
        } else {
          level1.toJump = true;
        }

        const atm =
          lv1.operate && lv1.operate.match(/atm\s*:\s*(["a-zA-Z-,]+?\")/gi);
        if (atm) {
          const nm = atm[0].replace(/atm\s*:\s*/gi, "").replace(/\"/gi, "");
          if (!crossAuth.hasOwnProperty(nm)) {
            crossAuth[nm] = {};
            Object.keys(level1.meta).forEach(key => {
              if (!crKey.includes(key)) {
                crossAuth[nm][key] = level1.meta[key];
              }
            });
            level1.__atm = nm;
          }
        }

        if (lv1.href !== null && lv1.href !== "") {
          needAuthRouter.push(level1);
          return level1;
        } else {
          return null;
        }
      });

      meta["_zOne"] = Object.keys(meta).sort()[0];

      return {
        level: level.filter(r => r !== null),
        meta: meta
      };
    };

    asyncRouter = tree.map((lv1, i) => {
      const level1 = {};
      level1.meta = {};
      level1.meta.auth = true;
      level1.path = lv1.href;
      level1.name = lv1.title;
      level1.index = i;
      level1.metaindex = i;
      level1.component = () => import("@/views" + lv1.href);

      if (lv1.children) {
        if (lv1.children.every(r => r.showFlag === false)) {
          level1.meta.jump = true;
          level1.toJump = true;
          if (lv1.children.some(r => r.href !== null && r.href !== "")) {
            level1._subIndex = level1.index;
          }
        } else {
          level1.toJump = false;
        }
        const c = calleeRoute(level1, lv1.children, level1.index, level1.path);
        level1.childrens = c.level;
        level1.meta = Object.assign(level1.meta, c.meta);
      } else {
        level1.meta.jump = true;
        level1.toJump = true;
        const url = lv1.href.split(",");
        if (url.length > 1) {
          const p2 = url[0].split(":")[1];
          level1.path = p2;
          level1.component = () => import("@/views" + url[1].split(":")[1]);
        }
      }
      const atm =
        lv1.operate && lv1.operate.match(/atm\s*:\s*(["a-zA-Z-,]+?\")/gi);
      if (atm) {
        const nm = atm[0].replace(/atm\s*:\s*/gi, "").replace(/\"/gi, "");
        if (!crossAuth.hasOwnProperty(nm)) {
          crossAuth[nm] = {};
          Object.keys(level1.meta).forEach(key => {
            if (!crKey.includes(key)) {
              crossAuth[nm][key] = level1.meta[key];
            }
          });
          level1.__atm = nm;
        }
      }
      needAuthRouter.push(level1);
      return level1;
    });
    return {
      tree: asyncRouter,
      route: setCrossAuth(needAuthRouter)
    };
  } else {
    return {
      tree: asyncRouter,
      route: needAuthRouter
    };
  }
};

export default getAsyncRouter;
