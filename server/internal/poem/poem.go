package main

import (
	"time"

	"gorm.io/gorm"
)

// Poem represents a single poem in the Exquisite Corpse project. It may be
// in-progress or completed.
type Poem interface {
	Completed() bool
	Lines() []string
	StartTime() time.Time
	CompleteTime() time.Time
	AddLine(string) error
	Complete() error
}

// poem is an internal implementation of Poem, using GORM.
type poem struct {
	gorm.Model
	lines     []string
	completed bool
}
