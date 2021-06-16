package com.notekeeper.model;

import org.json.JSONException;
import org.json.JSONObject;

public class Note {
	private String id;
	private String title;
	private String content;
	
	public Note() {
	
	}

	public Note(String id, String title, String content) {
		this.id = id;
		this.title = title;
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public JSONObject getJSONObject() {
        JSONObject obj = new JSONObject();
        try {
            obj.put("id", id);
            obj.put("title", title);
            obj.put("content", content);
        } catch (JSONException e) {
          e.printStackTrace();
        }
        return obj;
    }
}