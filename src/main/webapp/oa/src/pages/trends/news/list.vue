<template>
  <div id="articleList"></div>
</template>
<script>
export default {
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let $this = this;
      this.tableList({
        url: "/news/common/list",
        data: Utils.filterObjectNull(this.search),
        element: "#articleList",
        columns: [
          {
            name: "文章类型",
            minWidth: 100,
            align: "left",
            render(row) {
              return row.typeName.split("#")[0];
            }
          },
          {
            name: "标题",
            align: "left",
            minWidth: 300,
            operator(row) {
              var link = "";
              var style = {
                width: "100%",
                "text-align": "left"
              };
              if (row.isPublish == 0) {
                link = `${$this.appRoot}/news/detail?id=${row.id}`;
              } else {
                link = false;
                style.color = "#40474d";
                style.cursor = "context-menu";
              }
              return [
                {
                  name: row.newsTitle,
                  style: style,
                  href: link,
                  click(row) {}
                }
              ];
            }
          },
          {
            name: "作者",
            value: "addPersonName",
            width: 110,
            render(row) {
              let name = row.newsAuthor.split(" ");
              return name[name.length - 1];
            }
          },
          {
            name: "发布时间",
            width: 160,
            render(row) {
              let date = row.publishDate;
              return date ? new Date(date).toStr() : "-";
            }
          },
          {
            name: "查看数",
            value: "read",
            width: 90,
            operator(row) {
              return [
                {
                  name: row.read,
                  style: { color: "#01cd78" },
                  href: `${$this.appRoot}/trends/newsManage?id=${
                    row.id
                  }&type=${1}`,
                  click(row) {}
                }
              ];
            }
          },
          {
            name: "点赞数",
            value: "likes",
            width: 90,
            operator(row) {
              return [
                {
                  name: row.likes,
                  style: { color: "#01cd78" },
                  href: `${$this.appRoot}/trends/newsManage?id=${
                    row.id
                  }&type=${3}`,
                  click(row) {
                    $this.$emit("analyseClick", "3", row.id);
                  }
                }
              ];
            }
          },
          {
            name: "评论数",
            value: "commentCount",
            width: 90,
            operator(row) {
              return [
                {
                  name: row.commentCount,
                  style: { color: "#01cd78" },
                  href: `${$this.appRoot}/trends/newsManage?id=${
                    row.id
                  }&type=${4}`,
                  click(row) {
                    $this.$emit("analyseClick", "4", row.id);
                  }
                }
              ];
            }
          },
          {
            name: "当前状态",
            width: 100,
            render(row) {
              return ["已发布", "未发布"][row.isPublish];
            }
          },
          {
            name: "操作",
            width: 320,
            operator(row) {
              let publish = ["取消发布", "发布"][row.isPublish];
              let top = ["取消置顶", "置顶"][row.isTop];
              let doPublish = 0;
              let doTop = 0;
              let comment = ["关闭评论", "开启评论"][row.isComment];
              return [
                {
                  name: publish,
                  click(row) {
                    if (row.isPublish == 0) {
                      // 取消发布
                      doPublish = 1;
                    } else {
                      doPublish = 0;
                    }
                    $this.ajax({
                      url: "/news/" + row.id + "/" + doPublish + "/publish",
                      type: "put",
                      success(data) {
                        if (data.code == "success") {
                          $this.successTips();
                          $this.getList();
                        }
                      }
                    });
                  }
                },
                {
                  name: top,
                  click(row) {
                    if (row.isPublish == 1) {
                      $this.errorTips("请先发布再置顶!");
                    } else {
                      if (row.isTop == 0) {
                        // 取消置顶
                        doTop = 1;
                      } else {
                        doTop = 0;
                      }
                      $this.ajax({
                        url: "/news",
                        type: "put",
                        data: {
                          isTop: doTop,
                          id: row.id
                        },
                        success(data) {
                          if (data.code == "success") {
                            $this.successTips();
                            $this.getList();
                          }
                        }
                      });
                    }
                  }
                },
                {
                  name: "修改",
                  click(row) {
                    if (row.isPublish == 1) {
                      //未发布
                      $this.$emit('openModal', true, row)
                    } else {
                      $this.errorTips("请先取消发布再修改!");
                    }
                  }
                },
                {
                  name: comment,
                  click(row) {
                    let isComment = 0;
                    if (row.isComment == 0) {
                      // 关闭评论
                      isComment = 1;
                    } else {
                      isComment = 0;
                    }
                    $this.ajax({
                      url: "/news",
                      type: "put",
                      data: {
                        id: row.id,
                        isComment: isComment
                      },
                      success(data, $this) {
                        if (data.code == "success") {
                          $this.successTips("操作成功!");
                          $this.getList();
                        } else {
                          $this.errorTips(data.message);
                        }
                      }
                    });
                  }
                }
              ];
            }
          }
        ]
      });
    }
  },
  props: ['search']
};
</script>
