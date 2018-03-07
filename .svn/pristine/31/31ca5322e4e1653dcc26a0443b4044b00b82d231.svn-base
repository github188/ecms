package com.ecaray.ecms.commons.constant;

import com.github.pagehelper.Page;

/**
 * com.ecaray.ecms.commons
 * Author ：zhxy
 * 2017/3/30 19:00
 * 说明：chou
 */
public class PageResult {
    private int pages;
    private long totals;
    private int pageIndex;


    private String code;
    private String message;
    private Object content;

    public PageResult addPageInfo(Page page,int pageIndex) {
        this.pages = page.getPages();
        this.totals = page.getTotal();
        this.pageIndex = pageIndex;
        return this;
    }
    public PageResult addPageInfo(int pages,int totals,int pageIndex) {
        this.pages = pages;
        this.totals = totals;
        this.pageIndex = pageIndex;
        return this;
    }

    public enum Code {
        SUCCESS("success"), FAILED("failed");

        private final String value;

        Code(String value)
        {
            this.value = value;
        }

        public String getValue()
        {
            return value;
        }
    }

    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public PageResult(String code, String message)
    {
        super();
        this.code = code;
        this.message = message;
    }

    public PageResult()
    {
        super();
    }

    public static PageResult success()
    {
        return new PageResult(Result.Code.SUCCESS.getValue(), Result.Code.SUCCESS.getValue());
    }

    public static PageResult failed(String reason)
    {
        return new PageResult(Result.Code.FAILED.getValue(), reason);
    }

    @Override
    public String toString()
    {
        return "PageResult [code=" + code + ", message=" + message + "]";
    }



    public Object getContent()
    {
        return content;
    }

    public void setContent(Object content)
    {
        this.content = content;
    }

    public PageResult addObject(Object o){
        setContent(o);
        return this;
    }


    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public long getTotals() {
        return totals;
    }

    public void setTotals(long totals) {
        this.totals = totals;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }
}
