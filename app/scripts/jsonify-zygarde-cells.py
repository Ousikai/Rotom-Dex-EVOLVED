#!/usr/bin/env python
import os

def jsonify_zygarde_cells():
    id = 1
    imgs = os.listdir("img/zygarde/")
    imgs.sort()
    for file in imgs:
        ''' Get additional info '''
        island = file.split('-')[0]
        if 'core' in file.split ('-')[1]:
            print 'Notes: Core, teaches ____'
        else:
            print 'Notes: '
        #write id
        #write file
        
        #link.split('/')[-2]
        #print file
        #id += 1

def rename_imgs():
    imgs = os.listdir("img/")
    for file in imgs:
        parts_island = file.split('-')
        parts_ext = parts_island[1].split('.')
        ext = parts_ext[1]
        new_name = parts_island[0] + '-' + parts_ext[0] + 'OLD' + '.' + ext
        directory = '/full/path/to/img/location/'
        os.rename(directory + file, directory + new_name)

if __name__ == "__main__":
    jsonify_zygarde_cells()
