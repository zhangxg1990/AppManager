package com.topsec.ti.zxg.utils;

import org.springframework.core.convert.converter.Converter;

/**
 * Created by wx on 16-11-29.
 */
public class PageConverter<S,T> implements Converter<S,T>{
    Class<T> cls;
    DtoUtils.DtoCopyCallBack<S,T> copyCallBack;

    PageConverter(Class<T> cls, DtoUtils.DtoCopyCallBack copyCallBack) {
        this.cls = cls;
        this.copyCallBack = copyCallBack;
    }

    @Override
    public T convert(S source) {
        if (copyCallBack == null) {
            return DtoUtils.copyObject(cls, source);
        }
        return DtoUtils.copyObject(cls, source, copyCallBack);
    }
}
