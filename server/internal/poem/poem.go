package main

import (
	"time"

	"gorm.io/gorm"
)

// Poem represents a single poem in the Exquisite Corpse project. It may be
// in-progress or completed.
type Poem struct {
	ID                      int
	Complete                bool
	Lines                   []string
	StartTime, CompleteTime time.Time
}

// internalPoem is a representation of a poem internal to this package. It uses
// GORM to manage the database representation of the poem.
type internalPoem struct {
	gorm.Model
	lines        []string
	complete     bool
	completeTime time.Time
}

type PoemManager struct {
	Database gorm.DB
}

func (pm *PoemManager) GetPoem(pkey int) Poem {
	var p internalPoem
	pm.Database.First(p, pkey)
	return Poem{
		ID:           pkey,
		Complete:     p.complete,
		Lines:        p.lines,
		StartTime:    p.CreatedAt,
		CompleteTime: p.completeTime,
	}
}
