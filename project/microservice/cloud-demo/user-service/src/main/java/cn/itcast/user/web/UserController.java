package cn.itcast.user.web;

import cn.itcast.user.config.PatternProerties;
import cn.itcast.user.pojo.User;
import cn.itcast.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestController
@RequestMapping("/user")
//@RefreshScope
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PatternProerties patternProerties;
//    @Value("${pattern.dateformat}")
//    private String dateformat;
    @GetMapping("prop")
    public PatternProerties properties(){
        return patternProerties;
    }
    @GetMapping("now")
    public String now(){
//        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(dateformat));
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(patternProerties.getDateformat()));
    }
    /**
     * 路径： /user/110
     *
     * @param id 用户id
     * @return 用户
     */
    @GetMapping("/{id}")
    public User queryById(@PathVariable("id") Long id,
                          @RequestHeader(value ="Truth" ,required = false) String a)  {
        System.out.println("truth:" + a);
        return userService.queryById(id);
    }
}
