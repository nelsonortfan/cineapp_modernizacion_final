package net.itinajero.app.cineapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
public class TestController {

	@GetMapping(path = "/test")
	public @ResponseBody String mensaje() {
		return "hola";
	}
}
