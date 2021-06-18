package com.notekeeper.model;

import java.util.Map;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

public class LoginInterceptor implements Interceptor {
	private static final long serialVersionUID = 1L;
	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init() {
		// TODO Auto-generated method stub

	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		Map<String, Object> session = invocation
				.getInvocationContext().getSession();

		if (session == null
				|| session.get("userid") == null) {
			return "login";
		} else {
			if (!((String) session.get("userid")).equals(null)) {
				return invocation.invoke();
			} else {
				return "login";
			}
		}

	}

}
