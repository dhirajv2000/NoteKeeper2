//Generates a UUID for token based authentication
package com.notekeeper.model;

import java.util.UUID;

public class GetUUID {
	public static String getUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}
}
