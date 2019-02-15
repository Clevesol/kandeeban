export const GROUP_IDENTIFIER = 'com.cleveso.data.groups';
export const CONVERSATION_IDENTIFIER = 'com.cleveso.data.conversations';
export const TEMPLATES_IDENTIFIER = 'com.cleveso.data.templates';
export const PREFERENCE_SYNC_ON_START = 'com.cleveso.data.preference.los';
export const PREF_FIRST_BOOT = 'com.cleveso.data.preference.first_boot';

export const DB_SQL =  [
    'DROP TABLE IF EXISTS Groups',
    'DROP TABLE IF EXISTS Contacts',
    'DROP TABLE IF EXISTS ContactPhoneNumbers',
    'DROP TABLE IF EXISTS contactPhonesInGroup',
    'DROP TABLE IF EXISTS conversations',
    'DROP TABLE IF EXISTS conversationContactExcludes'+
    ' ',
'CREATE TABLE IF NOT EXISTS Groups (  '  + 
'   	groupid integer PRIMARY KEY AUTOINCREMENT,  '  + 
'   	groupName varchar,  '  + 
'   	gCode integer,  '  + 
'   	satatus integer  '  + 
'   );  '  , 
'     '  + 
'   CREATE TABLE IF NOT EXISTS Contacts (  '  + 
'   	id integer,  '  + 
'   	name varchar,  '  + 
'   	photo varchar  '  + 
'   );  '  + 
'     '  ,
'   CREATE TABLE IF NOT EXISTS ContactPhoneNumbers (  '  + 
'   	id integer PRIMARY KEY AUTOINCREMENT,  '  + 
'   	contactId integer,  '  + 
'   	contactNumber varchar, '  + 
'       cNtype varchar'+
'   );  '  ,
'     '  + 
'   CREATE TABLE IF NOT EXISTS contactPhonesInGroup (  '  + 
'   	id integer PRIMARY KEY AUTOINCREMENT,  '  + 
'   	groupId integer,  '  + 
'   	contactPhonenumber integer  '  + 
'   );  '  + 
'     '  ,
'   CREATE TABLE IF NOT EXISTS conversations (  '  + 
'   	id integer PRIMARY KEY AUTOINCREMENT,  '  + 
'   	message varchar,  '  + 
'   	groupid integer  '  + 
'   );  '  + 
'     '  ,
'   CREATE TABLE IF NOT EXISTS conversationContactExcludes (  '  + 
'   	id integer PRIMARY KEY AUTOINCREMENT,  '  + 
'   	groupId integer,  '  + 
'   	conversation integer,  '  + 
'   	contactPhoneNumber integer  '  + 
'   );  '  + 
'    '] ; 


export const DB_OPTIONS = 
{
name:'com_cleveso_ios_smspro01.db', 
location:'default'
};

export const APP_KEY_DB_CREATED = "APP_KEY_DB_CREATED_test";
export const APP_CONTACTS_SYNCED = "APP_CONTACTS_SYNCED_test";
export const CONTACTS_CACHE = "com.cleveso.cache.contactstemp";