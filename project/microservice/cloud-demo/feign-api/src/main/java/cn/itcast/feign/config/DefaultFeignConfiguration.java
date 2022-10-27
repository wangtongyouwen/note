package cn.itcast.feign.config;

import feign.Logger;
import org.springframework.context.annotation.Bean;

public class DefaultFeignConfiguration {
    @Bean
    public Logger.Level loglevel(){
        return Logger.Level.NONE; // 日志级别为BASIC
    }
}
