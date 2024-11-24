<?php

namespace App\TypeScript;

use ReflectionEnumBackedCase;

class EnumTransformer extends \Spatie\TypeScriptTransformer\Transformers\EnumTransformer
{
    protected function toEnumValue(ReflectionEnumBackedCase $case): string
    {
        $value = $case->getBackingValue();

        if (method_exists($case->getValue(), 'label')) {
            return json_encode(['label' => $case->getValue()->label(), 'value' => $value]);
        }

        return is_string($value) ? "'{$value}'" : "{$value}";
    }
}
