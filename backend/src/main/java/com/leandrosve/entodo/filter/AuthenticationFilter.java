package com.leandrosve.entodo.filter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.leandrosve.entodo.exception.ErrorResponse;
import com.leandrosve.entodo.service.UserService;
import com.leandrosve.entodo.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            authenticateRequest(request);
            filterChain.doFilter(request, response);
        }catch(Exception e){
            ErrorResponse error=new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "{unauthorized}");
            response.setStatus(error.getStatus());
            response.setContentType("application/json");
            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(error));
        }
    }

    private void authenticateRequest(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");
        String jwt = extractTokenFromHeader(authorizationHeader);
        if (jwt == null || jwt.length() == 0) return;

        String username = jwtUtil.extractUsername(jwt);
        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null)
            return;
        UserDetails userDetails = userService.loadUserByUsername(username);

        boolean isTokenValid = jwtUtil.validateToken(jwt, userDetails);

        if (!isTokenValid)
            return;

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken
                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    private String extractTokenFromHeader(String header) {
        if (header == null || !header.startsWith("Bearer ")) return null;
        return header.substring(7); //Remove Bearer prefix
    }


}
