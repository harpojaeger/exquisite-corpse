package main

import (
	"time"

	"gorm.io/gorm"
)

// Poem represents a single poem in the Exquisite Corpse project. It may be
// in-progress or completed.
type Poem interface {
	IsCompleted() bool
	Lines() []string
	StartTime() time.Time
	CompleteTime() time.Time
	AddLine(string) error
	Complete() error
}

// poem is an internal implementation of Poem, using GORM.
type poem struct {
	gorm.Model
	lines        []string
	complete     bool
	completeTime time.Time
}

type PoemManager struct {
	Database gorm.DB
}

func (p poem) IsCompleted() bool {
	return p.complete
}

func (p poem) Lines() []string {
	return p.lines
}

func (p poem) StartTime() time.Time {
	return p.CreatedAt
}

func (p poem) CompleteTime() time.Time {
	return p.completeTime
}

func (p poem) AddLine(string) error {
	return nil
}

func (p poem) Complete() error {
	return nil
}

func (pm *PoemManager) GetPoem(id string) Poem {
	var p poem
	pm.Database.First(p)
	return p
}
