# Documentation

# `class FileUtilities`

The FileUtilities class has all of the features of the FileUtilities module.

## `static renameFile(target, name)`

Renames the file to the name, the file stays in the same directory. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to rename
   * `name` — `String` — the new name of the file, not including the filepath
 * **Returns:** `Boolean` — whether or not the rename was successful

## `static moveFile(target, destination, replace)`

Moves the target file to the destination. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to move
   * `destination` — `String` — the filepath of the moved file
 * **Returns:** `Boolean` — whether or not the move was successful

## `static renameDirectory(target, name)`

Renames the directory to the name, the directory stays in the same directory. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `String` — the filepath of the directory to rename
   * `name` — `String` — the filepath of the renamed directory, not including the filepath
 * **Returns:** `Boolean` — whether or not the rename was successful

## `static moveDirectory(target, destination)`

Renames/moves the target directory to the destination. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `String` — the filepath of the directory to move
   * `destination` — `String` — the filepath of the moved directory
 * **Returns:** `Boolean` — whether or not the move was successful

## `static newFile(destination)`

Creates a new file at the destination. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `destination` — `String` — the filepath of the new file
 * **Returns:** `Boolean` — whether or not the file was successfully created

## `static newDirectory(destination)`

Creates a new directory at the destination. If the destination does not exist new directories will be made.

 * **Parameters:** 
   * `destination` — `String` — the filepath of the new directory
 * **Returns:** `Boolean` — whether or not the directory was successfully created

## `static delete(target)`

Deletes the target file/directory.

 * **Parameters:** 
   * `target` — `String` — the filepath if the file/directory to delete
 * **Returns:** `Boolean` — whether or not the delete was successful

## `static deleteOnExit(target)`

Deletes the target file/directory when minecraft closes (when the VM terminates).

 * **Parameters:**
   * `target` — `String` — the filepath of the file/directory to delete

## `static copyFile(target, destination, replace)`

Copies a file from the target to the destination.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to copy
   * `destination` — `String` — the filepath to copy it to, including the name of the file
   * `[replace]` — `Boolean` — whether or not to repalce existing files (defaults to false)
 * **Returns:** `Boolean` — false if the operation fails

## `static copyDirectory(target, destination, replace)`

Copies a directory, any subdirectories, and any files from the target to the destination.

 * **Parameters:**
   * `target` — `String` — the filepath of the directory to copy
   * `destination` — `String` — the filepath to copy it to, including the name of the directory
   * `[replace]` — `Boolean` — whether or not to repalce existing files and directories (defaults to false)
 * **Returns:** `Boolean` — false if the operation failss

## `static clearDirectory(target, onlyFiles)`

Deletes all files and directories in the target directory.

 * **Parameters:**
   * `target` — `String` — the filepath of the directory to clear
   * `[onlyFiles]` — `Boolean` — whether or not to leave directories (defaults to false)

## `static ZIP(target)`

Zips a folder recursively to filepath.zip.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to zip

## `static GZIP(target)`

Gzips a file to filepath.gz.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to gzip

## `static GZIPString(string)`

Gzips a string

 * **Parameters:** 
   * `string` — `String` — the string to compress
 * **Returns:** `String` — the compressed string

## `static unGZIP(target, destination)`

Extracts a gzipped file.

 * **Parameters:**
   * `target` — `String` — the filepath of the gzipped file
   * `[destination]` — `String` — the filepath to extract the file to (by default it will remove the last extension (usually .gz))
 * **Returns:** `String` — the ungzipped data that has been written to the file

## `static unGZIPString(string)`

Decompresses a gzipped string

 * **Parameters:** 
   * `string` — `String` — the string to decompress
 * **Returns:** `String` — the ungzipped string

## `static unGZIPURL(url, destination, connecttimeout, readtimeout)`

Gets gzipped data from a url and decodes it to the destination.

 * **Parameters:**
   * `url` — `String` — the url to get the gzipped data from
   * `destination` — `String` — the filepath to write the data to
   * `connecttimeout` — `Number` — the connect timeout of the connection in ms
   * `readtimeout` — `Number` — the read timeout of the connection in ms
 * **Returns:** `String` — the ungzipped data written to the file

## `static urlToFile(url, destination, connecttimeout, readtimeout)`

Gets data from a url and writes it to the destination.

 * **Parameters:**
   * `url` — `String` — the url to get the  data from
   * `destination` — `String` — the filepath to write the data to
   * `connecttimeout` — `Number` — the connect timeout of the connection in ms
   * `readtimeout` — `Number` — the read timeout of the connection in ms
 * **Returns:** `String` — the data written to the file

## `static listFilesRecursive(target)`

Returns an array of files, and files in subdirectories, within a directory.

 * **Parameters:** 
   * `target` — `String` — the filepath of the directory to recursively list the files from
 * **Returns:** `(String[] | Boolean)` — an array of files in the target directory and its subdirectories, or false if the target is not a directory

## `static listFiles(target)`

Returns an array of files within a directory.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to list the files from
 * **Returns:** `(String[] | Boolean)` — an array of files in the target directory, or false if the target is not a directory

## `static listDirectories(target)`

Returns an array of subdirectories within a directory.

 * **Parameters:**
   * `target` — `String` — the filepath to list the directories from
 * **Returns:** `(String[] | Boolean)` — an array of directories in the target directory, or false if the target is not a directory

## `static listFilesAndDirectories(target)`

Returns an array of files and subdirectories within a directory.

 * **Parameters:** 
   * `target` — `String` — the filepath to list the file and directories from
 * **Returns:** `(String[] | Boolean)` — an array of files and directories in the target directory, or false if the target is not a directory

## `static exists(target)`

Checks if the target file exists.

 * **Parameters:** 
   * `target` — `String` — the filepath to check
 * **Returns:** `Boolean` — whether or not the file exists

## `static isDirectory(target)`

Checks if the target is a directory.

 * **Parameters:** 
   * `target` — `String` — the filepath to check
 * **Returns:** `Boolean` — whether or not the file is a directory

## `static isFile(target)`

Checks if the target is a file.

 * **Parameters:**
   * `target` — `String` — the filepath to check
 * **Returns:** `Boolean` — whether or not the file is a file

## `static isHidden(target)`

Checks if the target is hidden.

 * **Parameters:**
   * `target` — `String` — the filepath to check
 * **Returns:** `Boolean` — whether or not the file is hidden

## `static canWrite(target)`

Tests if the file is writeable.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to test
 * **Returns:** `Boolean` — whether or not the file is writeable

## `static setWriteable(target, writeable, ownerOnly)`

Sets a file's write permission for the owner or everbody.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set writeable
   * `writeable` — `Boolean` — whether to set it writeable or not
   * `[ownerOnly]` — `Boolean` — owner's permission or everyone's permission (defaults to false)
 * **Returns:** `Boolean` — whether or not the operation suceeds

## `static canRead(target)`

Tests if the file is readable.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to test
 * **Returns:** `Boolean` — whether or not the file is readable

## `static setReadable(target, readable, ownerOnly)`

Sets a file's read permission for the owner or everbody.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set readable
   * `readable` — `Boolean` — whether to set it readable or not
   * `[ownerOnly]` — `Boolean` — owner's permission or everyone's permission (defaults to false)
 * **Returns:** `Boolean` — whether or not the operation suceeds

## `static canExcecute(target)`

Tests if the file is executable.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to test
 * **Returns:** `Boolean` — whether or not the file is executable

## `static setExecutable(target, executable, ownerOnly)`

Sets a file's execute permission for the owner or everbody.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set executable
   * `executable` — `Boolean` — whether to set it executable or not
   * `[ownerOnly]` — `Boolean` — owner's permission or everyone's permission (defaults to false)
 * **Returns:** `Boolean` — whether or not the operation suceeds

## `static getFileAttributes(target)`

Returns a map of the BasicFileAttributes. See https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributes.html for a list of the keys and what objects are returned.

 * **Parameters:** 
   * `target` — `String` — the file to get the attributes from
 * **Returns:** `Map<String, Object>` — a map of the file attributes, the key is the attribute name and the value is the attribute value

## `static setFileAttributes(target, attribute, value)`

Sets the BasicFileAttributes. See https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributes.html for a list of the attributes and objects their values are.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set an attribute of
   * `attribute` — `String` — the attribute name in camelCase
   * `value` — the value to set the attributes

## `static getFileSize(target)`

Returns the size of a file in bytes

 * **Parameters:**
   * `target` — `String` — the filepath of the file to get the size of
 * **Returns:** `Number` — the size of the file in bytes

## `static isSymbolicLink(target)`

Checks if a file is a symbolic link.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to check
 * **Returns:** `Boolean` — whether or not the file is a symbolic link

## `static getLastModifiedTime(target)`

Returns the time the file or directory was last modified.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to get the time from
 * **Returns:** `Date` — a date object of the time the file or directory was last modified

## `static setLastModifiedTime(target, time)`

Sets a file's last modified time.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set the time
   * `time` — `Number` — the time to set last modified (number of milliseconds since UNIX epoch)

## `static getLastAccessTime(target)`

Returns the time the file or directory was last accessed.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to get the time from
 * **Returns:** `Date` — a date object of the time the file or directory was last accessed

## `static setLastAccessTime(target, time)`

Sets a file's last accessed time.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set the time
   * `time` — `Number` — the time to set last accessed (number of milliseconds since UNIX epoch)

## `static getCreationTime(target)`

Returns the time the file or directory was created.

 * **Parameters:** 
   * `target` — `String` — the filepath of the file to get the time from
 * **Returns:** `Date` — a date object of the time the file or directory was created

## `static setCreatiomTime(target, time)`

Sets a file's creation time.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to set the time
   * `time` — `Number` — the time to set creation (number of milliseconds since UNIX epoch)

## `static getParentFolder(target, path)`

Gets the folder that a file is in.

 * **Parameters:**
   * `target` — `String` — he filepath of the file to get the parent folder of
   * `[path]` — `String` — whether to return the name (false) or full path (true) (defaults to false)
 * **Returns:** `String` — the name of the parent folder

## `static getExtension(target)`

Gets the extension of a file.

 * **Parameters:**
   * `target` — `String` — the filepath of the file to get the extension of
 * **Returns:** `String` — the file extension, e.g., "txt"