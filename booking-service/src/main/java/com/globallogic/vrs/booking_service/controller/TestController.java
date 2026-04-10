package com.globallogic.vrs.booking_service.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test-me")
    public String test() {
        return "I am alive!";
    }
}