#!/usr/bin/env python
import os

def jsonify_zygarde_cells():
    # Set up new JSON file
    f = open('zygarde-cells.json', 'w')
    f.write("[\n")
    id = 1
    imgs = os.listdir("img/zygarde/")
    imgs.sort()
    # Write JSON element for each zygarde cell
    for file in imgs:
        # Get JSON information from images
        parts_island = file.split('-')
        parts_ext = parts_island[1].split('.')
        island = parts_island[0].title() + ' ' +  str(int(parts_ext[0]))
        # Create JSON strings
        json_id = '\t\t"id": "%d",\n' % id
        json_file = '\t\t"file": "%s",\n' % ("img/zygarde/" + file)
        json_island = '\t\t"island": "%s",\n' % (island)
        json_location = '\t\t"location": "TacoBell",\n'
        json_notes = '\t\t"notes": " "\n'
        # Additional note if zygarde cell is a core
        if 'core' in file:
            json_notes = '\t\t"notes": "Core, teaches ____"\n'
        # Write JSON element
        f.write("\t{\n")
        f.write(json_id)
        f.write(json_file)
        f.write(json_island)
        f.write(json_location)
        f.write(json_notes)
        f.write("\t},\n")
        id += 1
    # Close JSON file
    f.write("]\n")
    f.close()

def rename_imgs():
    imgs = os.listdir("img/zygarde/")
    for file in imgs:
        parts_island = file.split('-')
        parts_ext = parts_island[1].split('.')
        ext = parts_ext[1]
        new_name = parts_island[0] + '-' + parts_ext[0] + 'OLD' + '.' + ext
        directory = '/full/path/to/img/location/'
        os.rename(directory + file, directory + new_name)

if __name__ == "__main__":
    jsonify_zygarde_cells()
